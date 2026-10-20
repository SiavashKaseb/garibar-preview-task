export type CargoOrderStatus = "open" | "in_progress" | "closed";

export interface CargoOrder {
  created_at: string;
  description?: string;
  destination_city: string;
  goods_name: string;
  id: number;
  origin_city: string;
  price_rial: number;
  status: CargoOrderStatus;
  weight_ton: number;
}

export interface GetCargoOrdersParams {
  origin_city?: string;
  page?: number;
  per_page?: number;
  search?: string;
  status?: CargoOrderStatus;
}

export interface GetCargoOrdersResponse {
  data: CargoOrder[];
  page: number;
  per_page: number;
  total: number;
}

export interface CreateCargoOrderPayload {
  description?: string;
  destination_city: string;
  goods_name: string;
  origin_city: string;
  price_rial: number;
  status?: CargoOrderStatus;
  weight_ton: number;
}

export type UpdateCargoOrderPayload = Partial<CreateCargoOrderPayload>;

export interface CargoOrderMutationResponse {
  data: CargoOrder;
}

export interface DeleteCargoOrderResponse {
  message: string;
}

export function getCargoOrders(
  params?: GetCargoOrdersParams,
): Promise<GetCargoOrdersResponse>;

export function createCargoOrder(
  payload?: CreateCargoOrderPayload,
): Promise<CargoOrderMutationResponse>;

export function updateCargoOrder(
  id: number,
  payload?: UpdateCargoOrderPayload,
): Promise<CargoOrderMutationResponse>;

export function deleteCargoOrder(id: number): Promise<DeleteCargoOrderResponse>;
