export function handleApiResponse<T = any>(res: any) {
    if (
      res?.success === false ||
      res?.error ||
      (typeof res.status === "number" && res.status >= 400)
    ) {
      throw new Error(res?.message || res?.error || "Operation failed");
    }
    return res;
  }