import { describe, it, expect, mock, beforeEach } from "bun:test";
import type { Context } from "hono";

// Controller imports — aliased to BDD method names
import {
  getLanguages as findAll,
  getLanguageById as findOne,
  createLanguage as create,
  updateLanguage as update,
  deleteLanguage as remove,
} from "./v1/languages.controller";

// -----------------  Helpers -----------------
// Simplified language factory
const makeLang = (n = 1) => ({
  id: BigInt(n),
  name: `Lang${n}`,
  code: `l${n}`,
  flagUrl: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
});

type MockedCtx = Context & {
  _mocks: { json: ReturnType<typeof mock>; reqJson: ReturnType<typeof mock> };
};

const ctx = (opts: {
  body?: Record<string, unknown>;
  params?: Record<string, string>;
  query?: Record<string, string>;
} = {}): MockedCtx => {
  const reqJson = mock().mockResolvedValue(opts.body || {});
  const jsonMock = mock();
  // Push into a global list so we can clean it in beforeEach (optional)
  if (!(global as any).__jsonMocks) {
    (global as any).__jsonMocks = [];
  }
  (global as any).__jsonMocks.push(jsonMock);
  return {
    req: {
      json: reqJson,
      param: (k: string) => opts.params?.[k],
      query: () => opts.query || {},
    },
    json: jsonMock,
    _mocks: { json: jsonMock, reqJson },
  } as unknown as MockedCtx;
};

// DB mock (minimal): select / insert / update chainable  helpers
const chain = (result: unknown) => {
  // Single underlying promise to satisfy any await/then chains without repeatedly wrapping
  const promise = Promise.resolve(result);

  // Handler to intercept property access and provide chainable query methods
  const handler: ProxyHandler<Record<string, unknown>> = {
    get(_target, prop) {
      // Promise interoperability --------------------------------------------------
      if (prop === "then") return promise.then.bind(promise);
      if (prop === "catch") return promise.catch.bind(promise);
      if (prop === "finally") return promise.finally.bind(promise);
      if (prop === Symbol.toStringTag) return "Promise";

      // Drizzle-like chainable query builder methods ------------------------------
      if (
        prop === "from" ||
        prop === "where" ||
        prop === "orderBy" ||
        prop === "limit" ||
        prop === "offset"
      ) {
        return () => proxy;
      }

      if (prop === "returning") {
        // insert/update returning()
        return () => promise;
      }

      // Fallback – undefined for anything else
      return undefined;
    },
  };

  // Create proxy object (empty target is fine; behavior is all in handler)
  const proxy = new Proxy<Record<string, unknown>>({}, handler) as any;

  return proxy;
};

const dbMock = {
  select: mock(),
  insert: mock(),
  update: mock(),
};

dbMock.select.mockReturnValue(chain([]));

dbMock.insert.mockReturnValue({ values: () => ({ returning: () => Promise.resolve([]) }) });

dbMock.update.mockReturnValue({ set: () => ({ where: () => ({ returning: () => Promise.resolve([]) }) }) });

mock.module("../db", () => ({ db: dbMock }));

// -----------------  Tests -----------------

describe("LanguagesController", () => {
  beforeEach(() => {
    // Safely reset mocks — on some bun:test versions `mockReset` might be missing,
    // so we guard and fall back to `mockClear` for robustness.
    Object.values(dbMock).forEach((mockFn) => {
      if (typeof (mockFn as any).mockReset === "function") {
        (mockFn as any).mockReset();
      } else if (typeof (mockFn as any).mockClear === "function") {
        // Yedek plan: mockClear yalnızca çağrı geçmişini temizler fakat yeterlidir.
        (mockFn as any).mockClear();
      }
    });
    // Clear previous global JSON mocks (the ctx helper recreates them per test but let's be safe)
    (global as any).__jsonMocks?.forEach((j: any) => j.mockClear?.());

    // Restore default select mock (empty result).
    (dbMock.select as any).mockReturnValue(chain([]));
  });

  // ---------- findAll ----------
  describe("findAll", () => {
    it("Given languages exist, When findAll called, Then return 200 with data", async () => {
      const rows = [makeLang(1), makeLang(2)];
      (dbMock.select as any)
        .mockReturnValueOnce(chain(rows)) // data
        .mockReturnValueOnce(chain([{ count: BigInt(rows.length) }])); // count
      const c = ctx({ query: { page: "1", limit: "10" } });
      await findAll(c);

      // --- Assert ---------------------------------------------------
      expect(c._mocks.json).toHaveBeenCalled();
      const [payload, status] = c._mocks.json.mock.calls[0] as [any, number | undefined];

      // Status assertion — treat undefined as 200
      expect(status ?? 200).toBe(200);

      // Body yapısı
      expect(payload).toEqual(
        expect.objectContaining({
          data: rows,
          pagination: expect.objectContaining({
            page: 1,
            limit: 10,
          }),
        })
      );
    });

    it("Given DB failure, When findAll called, Then return 500", async () => {
      (dbMock.select as any).mockImplementationOnce(() => {
        throw new Error("db err");
      });
      const c = ctx();
      await findAll(c);
      expect(c._mocks.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(String) }),
        500
      );
    });
  });

  // ---------- findOne ----------
  describe("findOne", () => {
    it("Given id exists, Then 200 & row", async () => {
      const row = makeLang(1);
      (dbMock.select as any).mockReturnValueOnce(chain([row]));
      const c = ctx({ params: { id: "1" } });
      await findOne(c);
      expect(c._mocks.json).toHaveBeenCalled();

      const [payload, status] = c._mocks.json.mock.calls[0] as [any, number | undefined];
      expect(status ?? 200).toBe(200);
      expect(payload).toEqual({ data: row });
    });

    it("Given no row, Then 404", async () => {
      (dbMock.select as any).mockReturnValueOnce(chain([]));
      const c = ctx({ params: { id: "99" } });
      await findOne(c);
      expect(c._mocks.json).toHaveBeenCalledWith(
        { error: "Language not found" },
        404
      );
    });
  });

  // ---------- create ----------
  describe("create", () => {
    it("Given unique payload, Then 201 & created row", async () => {
      const payload = { name: "Test", code: "tt" };
      const created = makeLang(3);
      (dbMock.select as any).mockReturnValueOnce(chain([])); // uniqueness
      (dbMock.insert as any).mockReturnValueOnce({
        values: () => ({ returning: () => Promise.resolve([created]) }),
      });
      const c = ctx({ body: payload });
      await create(c);
      expect(c._mocks.json).toHaveBeenCalledWith({ data: created }, 201);
    });

    it("Given duplicate code, Then 409", async () => {
      (dbMock.select as any).mockReturnValueOnce(chain([makeLang(1)]));
      const c = ctx({ body: { name: "Dup", code: "l1" } });
      await create(c);
      expect(c._mocks.json).toHaveBeenCalledWith(
        { error: "Language code already exists" },
        409
      );
    });
  });

  // ---------- update ----------
  describe("update", () => {
    it("Given existing id, Then 200 & updated row", async () => {
      const existing = makeLang(1);
      const updated = { ...existing, name: "New" };
      (dbMock.select as any)
        .mockReturnValueOnce(chain([existing])) // find existing
        .mockReturnValueOnce(chain([])); // uniqueness for code
      (dbMock.update as any).mockReturnValueOnce({
        set: () => ({ where: () => ({ returning: () => Promise.resolve([updated]) }) }),
      });
      const c = ctx({ params: { id: "1" }, body: { name: "New" } });
      await update(c);
      expect(c._mocks.json).toHaveBeenCalledWith({ data: updated });
    });

    it("Given non-existent id, Then 404", async () => {
      (dbMock.select as any).mockReturnValueOnce(chain([]));
      const c = ctx({ params: { id: "99" }, body: { name: "x" } });
      await update(c);
      expect(c._mocks.json).toHaveBeenCalledWith(
        { error: "Language not found" },
        404
      );
    });
  });

  // ---------- remove ----------
  describe("remove", () => {
    it("Given existing id, Then 200 success message", async () => {
      (dbMock.update as any).mockReturnValueOnce({
        set: () => ({ where: () => ({ returning: () => Promise.resolve([makeLang(1)]) }) }),
      });
      const c = ctx({ params: { id: "1" } });
      await remove(c);
      expect(c._mocks.json).toHaveBeenCalledWith(
        { message: "Language deleted successfully" }
      );
    });

    it("Given missing row, Then 404", async () => {
      (dbMock.update as any).mockReturnValueOnce({
        set: () => ({ where: () => ({ returning: () => Promise.resolve([]) }) }),
      });
      const c = ctx({ params: { id: "99" } });
      await remove(c);
      expect(c._mocks.json).toHaveBeenCalledWith(
        { error: "Language not found" },
        404
      );
    });
  });

  // ---------- findByCode (edge) ----------
  describe("findByCode", () => {
    const findByCode = async (code: string, c: MockedCtx) => {
      // Simple wrapper: call getLanguages with a search filter
      (c.req as any).query = () => ({ search: code, page: "1", limit: "1" });
      await findAll(c);
    };

    it("Given code present, Then 200 & row", async () => {
      const row = makeLang(5);
      (dbMock.select as any)
        .mockReturnValueOnce(chain([row])) // data row
        .mockReturnValueOnce(chain([{ count: BigInt(1) }])); // total count
      const c = ctx();
      await findByCode("l5", c);
      const [payload, status] = c._mocks.json.mock.calls[0] as [any, number | undefined];
      expect(status ?? 200).toBe(200);
      expect(payload).toEqual(
        expect.objectContaining({
          data: [row],
        })
      );
    });

    it("Given code absent, Then 200 empty array", async () => {
      (dbMock.select as any).mockReturnValueOnce(chain([]));
      (dbMock.select as any).mockReturnValueOnce(chain([{ count: BigInt(0) }]));
      const c = ctx();
      await findByCode("zzz", c);
      const [payload, status] = c._mocks.json.mock.calls[0] as [any, number | undefined];
      expect(status ?? 200).toBe(200);
      expect(payload).toEqual(
        expect.objectContaining({
          data: [],
        })
      );
    });
  });

  describe("💪 Brute-force (fuzz) – createLanguage", () => {
    // Generate random alphanumeric code
    const rndCode = () =>
      Math.random().toString(36).slice(2, 4 + Math.random() * 3);

    it("Controller should handle 1,000+ payloads including edge cases without crashing", async () => {
      const start = Date.now();
      const seen = new Set<string>();

      const TOTAL = 1_000;
      for (let i = 0; i < TOTAL; i++) {
        // Edge-case variations
        const isEdge = i % 100 === 0; // run an edge test every 100 iterations

        const code = isEdge
          ? i % 200 === 0
            ? "" // empty code
            : "𝔘𝔫𝗶𝚌𝕠𝗱𝑒".slice(0, 3) + rndCode() // unicode prefix
          : rndCode();

        const name = isEdge
          ? i % 300 === 0
            ? "" // empty name
            : "L".repeat(256) // extremely long
          : `Lang-${i}`;

        const payload = { name, code } as Record<string, unknown>;

        // Configure uniqueness mock and insert/response -------------------
        if (typeof (dbMock.select as any).mockReset === "function") {
          (dbMock.select as any).mockReset();
        } else if (typeof (dbMock.select as any).mockClear === "function") {
          (dbMock.select as any).mockClear();
        }

        if (code && seen.has(code)) {
          (dbMock.select as any).mockReturnValueOnce(chain([makeLang(1)]));
        } else {
          if (code) seen.add(code);
          (dbMock.select as any).mockReturnValueOnce(chain([]));

          if (typeof (dbMock.insert as any).mockReset === "function") {
            (dbMock.insert as any).mockReset();
          } else if (typeof (dbMock.insert as any).mockClear === "function") {
            (dbMock.insert as any).mockClear();
          }

          (dbMock.insert as any).mockReturnValueOnce({
            values: () => ({
              returning: () => Promise.resolve([makeLang(i + 10)]),
            }),
          });
        }

        const c = ctx({ body: payload });

        // --- Act ------------------------------------------------------
        await create(c);

        // --- Assert ---------------------------------------------------
        expect(c._mocks.json).toHaveBeenCalled(); // response is present
        const [, status] = c._mocks.json.mock.calls.at(-1)!;
        // Empty/long fields may trigger 400, duplicates 409, otherwise 201.
        expect([201, 400, 409]).toContain(status ?? 200);

        // Clear mocks each iteration to avoid memory leak
        (c._mocks.json as any).mockClear?.();
      }

      const durationMs = Date.now() - start;
      // Performance log (doesn't pollute test output in CI, purely informational)
      console.info(`Fuzz test completed: ${TOTAL} requests in ${durationMs}ms.`);
    });
  });
}); 