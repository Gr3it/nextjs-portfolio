export const validators = {
  number: (v) => Number.isFinite(Number(v)),
  boolean: (v) => v === "true" || v === "false",
  color: (v) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v),
};
