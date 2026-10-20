import { type FC } from "react";
import CargoOrdersTable from "./CargoOrdersTable";
import { TruckIcon } from "@/shared/icons/CustomSvgCode";

const DashboardView: FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.16),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(217,119,6,0.12),transparent_28%),linear-gradient(180deg,#f3efe6_0%,#f7f4ee_48%,#eef6f3_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-40 size-72 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 size-64 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-[0_10px_20px_-10px_rgba(15,118,110,0.8)]">
              <TruckIcon />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700">
                Garibar
              </p>
              <h1 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                Cargo dashboard
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="hidden text-sm text-slate-500 sm:block">
              Track, price and dispatch freight in one place.
            </p>
            <span>
              Create by{" "}
              <span className="font-bold text-teal-700">Siavash Kaseb</span>
            </span>
          </div>
        </header>

        <main className="pb-10">
          <CargoOrdersTable />
        </main>
      </div>
    </div>
  );
};

export default DashboardView;
