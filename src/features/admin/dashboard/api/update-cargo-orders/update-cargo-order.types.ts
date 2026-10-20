import type { CargoOrder } from "@/features/admin/dashboard/model/types";
import type { CreateCargoOrderRequest } from "@/features/admin/dashboard/api/create-cargo-orders/create-cargo-order.types";

export type UpdateCargoOrderRequest = Partial<CreateCargoOrderRequest>;

export interface UpdateCargoOrderResponse {
  data: CargoOrder;
}
