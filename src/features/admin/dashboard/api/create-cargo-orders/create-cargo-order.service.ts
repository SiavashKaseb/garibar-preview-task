import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import type {
  CreateCargoOrderRequest,
  CreateCargoOrderResponse,
} from "./create-cargo-order.types";
import { createCargoOrder as createCargoOrderMock } from "@/mock/mockApi.js";

export async function createCargoOrder(
  body: CreateCargoOrderRequest,
): Promise<CreateCargoOrderResponse> {
  const response = await createCargoOrderMock(
    snakecaseKeys({ ...body }, { deep: true }),
  );

  return camelcaseKeys(response, { deep: true });
}
