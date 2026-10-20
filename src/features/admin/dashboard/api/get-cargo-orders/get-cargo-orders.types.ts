import type { CargoOrder } from "@/features/admin/dashboard/model/types";

export interface GetCargoOrdersResponse {
  data: CargoOrder[];
  page: number;
  perPage: number;
  total: number;
}
