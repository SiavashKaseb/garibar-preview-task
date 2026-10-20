import { mutationOptions } from "@tanstack/react-query";

import { CargoKeys } from "@/shared/api/query-keys/admin/cargo.keys";
import { updateCargoOrder } from "./update-cargo-order.service";
import type { UpdateCargoOrderRequest } from "./update-cargo-order.types";

export const updateCargoOrderMutationOptions = mutationOptions({
  mutationKey: CargoKeys.update(),
  mutationFn: ({
    id,
    body,
  }: {
    id: number;
    body: UpdateCargoOrderRequest;
  }) => updateCargoOrder(id, body),
});
