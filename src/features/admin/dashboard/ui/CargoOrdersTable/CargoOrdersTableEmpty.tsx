import { type FC } from "react";
import { Button } from "antd";
import { EmptyBoxIcon } from "@/shared/icons/CustomSvgCode";

interface CargoOrdersTableEmptyProps {
  hasFilters?: boolean;
  onCreate?: () => void;
}

const CargoOrdersTableEmpty: FC<CargoOrdersTableEmptyProps> = ({
  hasFilters = false,
  onCreate,
}) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)]">
      <div className="relative overflow-hidden px-6 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,118,110,0.12),transparent_55%)]" />
        <div className="pointer-events-none absolute -left-10 top-8 size-28 rounded-full bg-teal-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -right-8 bottom-4 size-24 rounded-full bg-amber-100/80 blur-2xl" />

        <div className="relative mx-auto flex max-w-md flex-col items-center">
          <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-teal-50 ring-1 ring-teal-100 shadow-[0_8px_24px_-8px_rgba(15,118,110,0.45)]">
            <EmptyBoxIcon />
          </div>

          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            {hasFilters ? "No matches" : "Empty board"}
          </p>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-slate-800">
            {hasFilters ? "No cargo orders match these filters" : "No cargo orders yet"}
          </h3>
          <p className="mb-7 text-sm leading-6 text-slate-500">
            {hasFilters
              ? "Try another city, status or goods name. Your current filters stay in the URL."
              : "When the first shipment lands here, the board will fill with routes, prices and status."}
          </p>

          {onCreate ? (
            <Button
              type="primary"
              onClick={onCreate}
              className="h-10 rounded-xl px-5 shadow-[0_10px_20px_-10px_rgba(15,118,110,0.7)]"
            >
              Create order
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CargoOrdersTableEmpty;
