export const CargoKeys = {
  all: ["cargo"] as const,
  orders: () => [...CargoKeys.all, "orders"] as const,
  delete: () => [...CargoKeys.all, "delete"] as const,
  update: () => [...CargoKeys.all, "update"] as const,
  create: () => [...CargoKeys.all, "create"] as const,
};
