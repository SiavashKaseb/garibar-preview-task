import { type FC, useMemo, useState } from "react";
import { Button, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getCargoOrdersQueryOptions } from "@/features/admin/dashboard/api/get-cargo-orders/get-cargo-orders.query";
import type { CargoOrder } from "@/features/admin/dashboard/model/types";

import { getCargoColumns } from "./CargoOrdersColumns";
import CargoOrdersTableLoading from "./CargoOrdersTableLoading";
import CargoOrdersTableError from "./CargoOrdersTableError";
import CreateCargoOrderModal from "./CreateCargoOrderModal";
import UpdateCargoOrderModal from "./UpdateCargoOrderModal";
import DeleteCargoOrderModal from "./DeleteCargoOrderModal";
import CargoOrdersFilters from "./CargoOrdersFilters";
import CargoOrdersTableEmpty from "./CargoOrdersTableEmpty";
import { useCargoOrdersFilters } from "./useCargoOrdersFilters";

const CargoOrdersTable: FC = () => {
  const {
    filters,
    originCity,
    searchInput,
    status,
    setOriginCity,
    setSearch,
    setStatus,
  } = useCargoOrdersFilters();
  const cargoOrders = useQuery(getCargoOrdersQueryOptions(filters));
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<CargoOrder | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<CargoOrder | null>(null);

  const columns = useMemo(
    () =>
      getCargoColumns({
        onEdit: setEditingOrder,
        onDelete: setDeletingOrder,
      }),
    [],
  );

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-3xl border border-white/80 bg-white/80 p-4 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700">
              Operations
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Cargo orders
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Filter the live board, then create or update a shipment.
            </p>
          </div>

          <Button
            type="primary"
            size="large"
            onClick={() => setIsCreateOpen(true)}
            className="h-11 rounded-2xl px-5 shadow-[0_12px_24px_-12px_rgba(15,118,110,0.85)]"
          >
            Create order
          </Button>
        </div>

        <CargoOrdersFilters
          status={status}
          originCity={originCity}
          search={searchInput}
          onStatusChange={setStatus}
          onOriginCityChange={setOriginCity}
          onSearchChange={setSearch}
        />
      </section>

      {cargoOrders.isLoading ? (
        <CargoOrdersTableLoading />
      ) : cargoOrders.isError ? (
        <CargoOrdersTableError onRetry={cargoOrders.refetch} />
      ) : (cargoOrders.data?.data || []).length === 0 ? (
        <CargoOrdersTableEmpty
          hasFilters={Boolean(
            filters.status || filters.originCity || filters.search,
          )}
          onCreate={() => setIsCreateOpen(true)}
        />
      ) : (
        <section className="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)]">
          <div className="flex items-center justify-between border-b border-[#eeeae0] px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Order board
              </p>
              <p className="text-xs text-slate-500">
                {cargoOrders.data?.total ?? 0} matching results
              </p>
            </div>
          </div>
          <Table
            className="dashboard-table"
            dataSource={cargoOrders.data?.data || []}
            columns={columns}
            rowKey="id"
            loading={cargoOrders.isFetching}
            scroll={{ x: 980 }}
          />
        </section>
      )}

      <CreateCargoOrderModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
      <UpdateCargoOrderModal
        open={Boolean(editingOrder)}
        order={editingOrder}
        onClose={() => setEditingOrder(null)}
      />
      <DeleteCargoOrderModal
        open={Boolean(deletingOrder)}
        order={deletingOrder}
        onClose={() => setDeletingOrder(null)}
      />
    </div>
  );
};

export default CargoOrdersTable;
