import snakecaseKeys from "snakecase-keys";
import type { GetCargoOrdersResponse } from "./get-cargo-orders.types";
import { getCargoOrders as getCargoOrdersMock } from "@/mock/mockApi.js";
import camelcaseKeys from "camelcase-keys";
import type { GetCargoOrdersParams } from "@/features/admin/dashboard/model/types";

const compactParams = (params: GetCargoOrdersParams) =>
  Object.fromEntries(
    Object.entries({
      originCity: params.originCity,
      search: params.search,
      status: params.status,
    }).filter(([, value]) => Boolean(value)),
  );

export async function getCargoOrders(
  params: GetCargoOrdersParams = {},
): Promise<GetCargoOrdersResponse> {
  const query = snakecaseKeys(compactParams(params), { deep: true });
  const data = await getCargoOrdersMock(query);
  return camelcaseKeys(data, { deep: true });
}
