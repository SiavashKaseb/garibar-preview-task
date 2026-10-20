import { queryOptions } from "@tanstack/react-query";
import { CargoKeys } from "@/shared/api/query-keys/admin/cargo.keys";
import { getCargoOrders } from "./get-cargo-orders.service";
import type { GetCargoOrdersParams } from "@/features/admin/dashboard/model/types";

export const getCargoOrdersQueryOptions = (params: GetCargoOrdersParams = {}) =>
  queryOptions({
    queryKey: [...CargoKeys.orders(), params],
    queryFn: () => getCargoOrders(params),
  });
