import {
  QueryClient,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { defaultQueryOptions } from "./default-options";

function createQueryClient() {
  return new QueryClient({
    defaultOptions: defaultQueryOptions,
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return createQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }

  return browserQueryClient;
}

export function clearQueryCache() {
  if (typeof window === "undefined") {
    return;
  }

  getQueryClient().clear();
}

export function invalidateQueries(queryKey: QueryKey | QueryKey[]) {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey });
}
