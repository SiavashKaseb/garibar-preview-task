import { mutationOptions } from "@tanstack/react-query";

import { CargoKeys } from "@/shared/api/query-keys/admin/cargo.keys";
import { deleteCargoOrder } from "./delete-cargo-order.service";

export const deleteCargoOrderMutationOptions = mutationOptions({
  mutationKey: CargoKeys.delete(),
  mutationFn: deleteCargoOrder,
});
