import type { CargoOrder } from "@/features/admin/dashboard/model/types";

export interface CreateCargoOrderRequest {
  description?: string;
  destinationCity: string;
  goodsName: string;
  originCity: string;
  priceRial: number;
  status: CargoOrder["status"];
  weightTon: number;
}

export interface CreateCargoOrderResponse {
  data: CargoOrder;
}
