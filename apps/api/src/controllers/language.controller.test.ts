import { describe, it, expect, mock, beforeEach } from "bun:test";

/* 1) db'yi önce mock'la */
const selectMock   = mock().mockReturnThis();
const fromMock     = mock().mockReturnThis();
const whereMock    = mock().mockReturnThis();
const orderByMock  = mock().mockReturnThis();
const limitMock    = mock().mockReturnThis();
const offsetMock   = mock().mockReturnThis();
const insertMock   = mock().mockImplementation(() => ({
values: mock().mockImplementation(() => ({ returning: mock() })),
}));
const updateMock   = mock().mockImplementation(() => ({
set: mock().mockImplementation(() => ({
    where: mock().mockImplementation(() => ({ returning: mock() })),
})),
}));

mock.module("../db", () => ({
db: {
    select: selectMock,
    from:   fromMock,
    where:  whereMock,
    orderBy: orderByMock,
    limit:  limitMock,
    offset: offsetMock,
    insert: insertMock,
    update: updateMock,
  },
}));

/* 2) mock sonrası import'lar */
import { db } from "../db";
import {
  createLanguage,
  updateLanguage,
} from "./v1/languages.controller";
import { Context } from "hono";

const mockJson = mock();
const mockReqJson = mock();

const mockContext = (
  body?: Record<string, unknown>,
  params?: Record<string, string>
) =>
  ({
    req: {
      json: mockReqJson.mockResolvedValue(body || {}),
      param: (key: string) => params?.[key],
    },
    json: mockJson,
  }) as unknown as Context;

describe("Languages Controller", () => {
  beforeEach(() => {
    selectMock.mockClear();
    insertMock.mockClear();
    // ...
    mockJson.mockClear();
    mockReqJson.mockClear();
    // clear db mocks each time
    (db.insert as any).mockClear();
    (db.update as any).mockClear();
    (db.select as any).mockClear();
  });

  describe("createLanguage", () => {
    it("should create a language successfully", async () => {
      const newLanguage = {
        name: "English",
        code: "en",
        flagUrl: "https://flagcdn.com/en.svg",
      };
      const createdLanguage = { id: 1, ...newLanguage };

      // mock uniqueness check (select -> from -> where -> limit) to return []
      const limitUniqMock = mock().mockResolvedValue([]);
      const whereUniqMock = mock().mockReturnValue({ limit: limitUniqMock });
      const fromUniqMock = mock().mockReturnValue({ where: whereUniqMock });
      (db.select as any).mockReturnValueOnce({ from: fromUniqMock });

      // mock insert returning
      const returningMock = mock().mockResolvedValue([createdLanguage]);
      const valuesMock = mock().mockReturnValue({ returning: returningMock });
      const insertMock = db.insert as any;
      insertMock.mockReturnValue({ values: valuesMock });

      const c = mockContext(newLanguage);
      await createLanguage(c);

      expect(db.insert).toHaveBeenCalled();
      expect(valuesMock).toHaveBeenCalledWith({
        name: newLanguage.name,
        code: newLanguage.code,
        flagUrl: newLanguage.flagUrl,
      });
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith({ data: createdLanguage }, 201);
    });

    it("should return 400 if validation fails", async () => {
      const invalidData = { name: "", code: "" };
      const c = mockContext(invalidData);
      await createLanguage(c);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(Object) }),
        400
      );
    });

    it("should return 409 if language code already exists", async () => {
      const data = { name: "English", code: "en" };
      // uniqueness check returns existing row
      const limitConflictMock = mock().mockResolvedValue([data]);
      const whereConflictMock = mock().mockReturnValue({ limit: limitConflictMock });
      const fromConflictMock = mock().mockReturnValue({ where: whereConflictMock });
      (db.select as any).mockReturnValueOnce({ from: fromConflictMock });

      const c = mockContext(data);
      await createLanguage(c);

      expect(mockJson).toHaveBeenCalledWith(
        { error: "Language code already exists" },
        409
      );
    });
  });

  describe("updateLanguage", () => {
    it("should update language successfully", async () => {
      const existing = { id: 1, name: "English", code: "en" };
      const updatePayload = { name: "British English" };
      const updated = { ...existing, ...updatePayload };

      // first select existing row
      const limitExistMock = mock().mockResolvedValue([existing]);
      const whereExistMock = mock().mockReturnValue({ limit: limitExistMock });
      const fromExistMock = mock().mockReturnValue({ where: whereExistMock });
      (db.select as any).mockReturnValueOnce({ from: fromExistMock });

      // update returning
      const updateReturningMock = mock().mockResolvedValue([updated]);
      const whereMock = mock().mockReturnValue({ returning: updateReturningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(updatePayload, { id: "1" });
      await updateLanguage(c);

      expect(db.update).toHaveBeenCalled();
      expect(setMock).toHaveBeenCalledWith(expect.objectContaining(updatePayload));
      expect(updateReturningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith({ data: updated });
    });

    it("should return 404 if language not found", async () => {
      // select existing returns []
      const limitNotFoundMock = mock().mockResolvedValue([]);
      const whereNotFoundMock = mock().mockReturnValue({ limit: limitNotFoundMock });
      const fromNotFoundMock = mock().mockReturnValue({ where: whereNotFoundMock });
      (db.select as any).mockReturnValueOnce({ from: fromNotFoundMock });

      const c = mockContext({ name: "Test" }, { id: "999" });
      await updateLanguage(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Language not found" }, 404);
    });

    it("should return 409 if updated code already exists", async () => {
      const existing = { id: 1, name: "English", code: "en" };
      const conflict = { id: 2, name: "Spanish", code: "es" };
      const payload = { code: "es" };

      // first select existing row (found)
      const limitExist2Mock = mock().mockResolvedValue([existing]);
      const whereExist2Mock = mock().mockReturnValue({ limit: limitExist2Mock });
      const fromExist2Mock = mock().mockReturnValue({ where: whereExist2Mock });
      (db.select as any).mockReturnValueOnce({ from: fromExist2Mock });

      // second select check for conflict returns row
      const limitConflict2Mock = mock().mockResolvedValue([conflict]);
      const whereConflict2Mock = mock().mockReturnValue({ limit: limitConflict2Mock });
      const fromConflict2Mock = mock().mockReturnValue({ where: whereConflict2Mock });
      (db.select as any).mockReturnValueOnce({ from: fromConflict2Mock });

      const c = mockContext(payload, { id: "1" });
      await updateLanguage(c);
      expect(mockJson).toHaveBeenCalledWith(
        { error: "Language code already exists" },
        409
      );
    });

    it("should return 400 if payload invalid", async () => {
      const existing = { id: 1, name: "English", code: "en" };
      const invalidPayload = { name: "" };

      // existing row found
      const limitExist2Mock = mock().mockResolvedValue([existing]);
      const whereExist2Mock = mock().mockReturnValue({ limit: limitExist2Mock });
      const fromExist2Mock = mock().mockReturnValue({ where: whereExist2Mock });
      (db.select as any).mockReturnValueOnce({ from: fromExist2Mock });

      const c = mockContext(invalidPayload, { id: "1" });
      await updateLanguage(c);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(Object) }),
        400
      );
    });
  });
});
