export type CargoOrderStatus = "open" | "in_progress" | "closed";

export interface CargoOrder {
  createdAt: string;
  description?: string;
  destinationCity: string;
  goodsName: string;
  id: number;
  originCity: string;
  priceRial: number;
  status: CargoOrderStatus;
  weightTon: number;
}

export interface GetCargoOrdersParams {
  originCity?: string;
  search?: string;
  status?: CargoOrderStatus;
}
