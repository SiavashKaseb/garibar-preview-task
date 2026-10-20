import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import type {
  UpdateCargoOrderRequest,
  UpdateCargoOrderResponse,
} from "./update-cargo-order.types";
import { updateCargoOrder as updateCargoOrderMock } from "@/mock/mockApi.js";

export async function updateCargoOrder(
  id: number,
  body: UpdateCargoOrderRequest,
): Promise<UpdateCargoOrderResponse> {
  const response = await updateCargoOrderMock(
    id,
    snakecaseKeys({ ...body }, { deep: true }),
  );

  return camelcaseKeys(response, { deep: true });
}
