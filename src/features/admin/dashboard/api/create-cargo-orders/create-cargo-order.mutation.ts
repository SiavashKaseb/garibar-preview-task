import { mutationOptions } from "@tanstack/react-query";

import { createCargoOrder } from "./create-cargo-order.service";
import { CargoKeys } from "@/shared/api/query-keys/admin/cargo.keys";

export const createCargoOrderMutationOptions = mutationOptions({
  mutationKey: CargoKeys.create(),
  mutationFn: createCargoOrder,
});
