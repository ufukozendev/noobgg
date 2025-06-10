type Serializable = bigint | string | number | boolean | null | undefined | Date | Serializable[] | { [key: string]: Serializable };

export function convertBigIntToString(obj: Serializable): Serializable {
  if (typeof obj === "bigint") {
    return obj.toString();
  }
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  }
  if (obj !== null && typeof obj === "object") {
    const converted: { [key: string]: Serializable } = {};
    for (const [key, value] of Object.entries(obj)) {
      converted[key] = convertBigIntToString(value);
    }
    return converted;
  }
  return obj;
}

export function convertBigIntToNumber(obj: Serializable): Serializable {
  if (typeof obj === "bigint") {
    if (obj > Number.MAX_SAFE_INTEGER || obj < Number.MIN_SAFE_INTEGER) {
      throw new Error(`BigInt value ${obj} is outside safe integer range`);
    }
    return Number(obj);
  }
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToNumber);
  }
  if (obj !== null && typeof obj === "object") {
    const converted: { [key: string]: Serializable } = {};
    for (const [key, value] of Object.entries(obj)) {
      converted[key] = convertBigIntToNumber(value);
    }
    return converted;
  }
  return obj;
}
