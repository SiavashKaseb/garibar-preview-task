import camelcaseKeys from "camelcase-keys";
import type { DeleteCargoOrderResponse } from "./delete-cargo-order.types";
import { deleteCargoOrder as deleteCargoOrderMock } from "@/mock/mockApi.js";

export async function deleteCargoOrder(
  id: number,
): Promise<DeleteCargoOrderResponse> {
  const response = await deleteCargoOrderMock(id);
  return camelcaseKeys(response, { deep: true });
}
