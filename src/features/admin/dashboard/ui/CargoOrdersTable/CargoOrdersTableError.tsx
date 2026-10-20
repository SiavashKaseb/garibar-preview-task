import { type FC } from "react";
import { Button } from "antd";
import { ErrorIcon } from "@/shared/icons/CustomSvgCode";

interface CargoOrdersTableErrorProps {
  onRetry?: () => void;
}

const CargoOrdersTableError: FC<CargoOrdersTableErrorProps> = ({ onRetry }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)]">
      <div className="relative overflow-hidden px-6 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,113,133,0.14),transparent_55%)]" />
        <div className="pointer-events-none absolute -left-10 top-8 size-28 rounded-full bg-rose-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -right-8 bottom-4 size-24 rounded-full bg-orange-100/80 blur-2xl" />

        <div className="relative mx-auto flex max-w-md flex-col items-center">
          <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-rose-50 ring-1 ring-rose-100 shadow-[0_8px_24px_-8px_rgba(225,29,72,0.45)]">
            <ErrorIcon />
          </div>

          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-400">
            Connection issue
          </p>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-slate-800">
            Couldn&apos;t load cargo orders
          </h3>
          <p className="mb-7 text-sm leading-6 text-slate-500">
            The table couldn&apos;t reach the orders list. Check your connection
            and try again — your filters will stay as they are.
          </p>

          {onRetry ? (
            <Button
              type="primary"
              onClick={onRetry}
              className="h-10 rounded-xl px-5 shadow-[0_10px_20px_-10px_rgba(225,29,72,0.7)]"
              style={{ background: "#e11d48", borderColor: "#e11d48" }}
            >
              Try again
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CargoOrdersTableError;
