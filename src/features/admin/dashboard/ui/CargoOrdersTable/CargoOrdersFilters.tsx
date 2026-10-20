import { type FC } from "react";
import { Input, Select } from "antd";
import type { CargoOrderStatus } from "@/features/admin/dashboard/model/types";

interface CargoOrdersFiltersProps {
  originCity: string;
  search: string;
  status: CargoOrderStatus | "all";
  onOriginCityChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CargoOrderStatus | "all") => void;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "closed", label: "Closed" },
];

const CargoOrdersFilters: FC<CargoOrdersFiltersProps> = ({
  originCity,
  search,
  status,
  onOriginCityChange,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Status
        </span>
        <Select
          size="large"
          value={status}
          options={STATUS_OPTIONS}
          onChange={onStatusChange}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Origin city
        </span>
        <Input
          size="large"
          value={originCity}
          placeholder="Tehran"
          allowClear
          onChange={(event) => onOriginCityChange(event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Goods search
        </span>
        <Input
          size="large"
          value={search}
          placeholder="Steel coils"
          allowClear
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
    </div>
  );
};

export default CargoOrdersFilters;
