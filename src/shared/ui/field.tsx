import type { FC, ReactNode } from "react";

const Field: FC<{
  label: string;
  error?: string;
  children: ReactNode;
}> = ({ label, error, children }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
      {label}
    </span>
    {children}
    {error ? <span className="text-xs text-rose-500">{error}</span> : null}
  </label>
);

export default Field;
