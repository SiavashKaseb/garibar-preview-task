import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";
import type { CargoOrderStatus, GetCargoOrdersParams } from "@/features/admin/dashboard/model/types";

const SEARCH_DEBOUNCE_MS = 400;

const STATUS_VALUES = ["open", "in_progress", "closed"] as const;

const isCargoOrderStatus = (value: string | null): value is CargoOrderStatus =>
  STATUS_VALUES.some((status) => status === value);

const readParam = (searchParams: URLSearchParams, key: string) =>
  searchParams.get(key)?.trim() || undefined;

const writeParam = (
  searchParams: URLSearchParams,
  key: string,
  value?: string,
) => {
  if (value) {
    searchParams.set(key, value);
    return;
  }

  searchParams.delete(key);
};

export const parseCargoOrdersFilters = (
  searchParams: URLSearchParams,
): GetCargoOrdersParams => {
  const status = searchParams.get("status");

  return {
    originCity: readParam(searchParams, "originCity"),
    search: readParam(searchParams, "search"),
    status: isCargoOrderStatus(status) ? status : undefined,
  };
};

export const useCargoOrdersFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(
    () => parseCargoOrdersFilters(searchParams),
    [searchParams],
  );
  const [searchInput, setSearchInput] = useState(filters.search ?? "");

  useEffect(() => {
    setSearchInput(filters.search ?? "");
  }, [filters.search]);

  const updateFilters = (next: GetCargoOrdersParams) => {
    setSearchParams(
      (current) => {
        const params = new URLSearchParams(current);
        writeParam(params, "status", next.status);
        writeParam(params, "originCity", next.originCity);
        writeParam(params, "search", next.search);
        return params;
      },
      { replace: true },
    );
  };

  const setDebouncedSearch = useDebouncedCallback((value: string) => {
    const search = value.trim() || undefined;

    if (search === filters.search) {
      return;
    }

    updateFilters({ ...filters, search });
  }, SEARCH_DEBOUNCE_MS);

  const status: CargoOrderStatus | "all" = filters.status ?? "all";

  return {
    filters,
    searchInput,
    status,
    setStatus: (status: CargoOrderStatus | "all") => {
      updateFilters({
        ...filters,
        status: status === "all" ? undefined : status,
      });
    },
    originCity: searchParams.get("originCity") ?? "",
    setOriginCity: (originCity: string) => {
      updateFilters({
        ...filters,
        originCity: originCity.trim() ? originCity : undefined,
      });
    },
    setSearch: (search: string) => {
      setSearchInput(search);
      setDebouncedSearch(search);
    },
  };
};
