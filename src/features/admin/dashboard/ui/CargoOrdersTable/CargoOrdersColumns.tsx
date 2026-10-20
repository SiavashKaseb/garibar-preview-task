import { Button, type TableColumnType } from "antd";
import type { CargoOrder } from "@/features/admin/dashboard/model/types";
import { addCommas } from "@persian-tools/persian-tools";

const formatStatus = (status: "open" | "in_progress" | "closed") => {
  switch (status) {
    case "open":
      return "Open";
    case "in_progress":
      return "In Progress";
    case "closed":
      return "Closed";
  }
};

const statusClassName = (status: "open" | "in_progress" | "closed") => {
  switch (status) {
    case "open":
      return "bg-sky-50 text-sky-700 ring-sky-100";
    case "in_progress":
      return "bg-amber-50 text-amber-700 ring-amber-100";
    case "closed":
      return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  }
};

interface CargoColumnsOptions {
  onEdit: (order: CargoOrder) => void;
  onDelete: (order: CargoOrder) => void;
}

export const getCargoColumns = ({
  onEdit,
  onDelete,
}: CargoColumnsOptions): TableColumnType<CargoOrder>[] => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 84,
    render: (text) => (
      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
        #{text}
      </span>
    ),
  },

  {
    title: "Goods Name",
    dataIndex: "goodsName",
    key: "goodsName",
    render: (text: string) => (
      <span className="font-medium text-slate-800">{text}</span>
    ),
  },

  {
    title: "Origin City",
    dataIndex: "originCity",
    key: "originCity",
    render: (text: string) => <span className="text-slate-600">{text}</span>,
  },

  {
    title: "Destination City",
    dataIndex: "destinationCity",
    key: "destinationCity",
    render: (text: string) => <span className="text-slate-600">{text}</span>,
  },

  {
    title: "Price (Rial)",
    dataIndex: "priceRial",
    key: "priceRial",
    render: (text: number) => (
      <span className="font-semibold tabular-nums text-slate-800">
        {addCommas(text)}
      </span>
    ),
  },

  {
    title: "Weight (Ton)",
    dataIndex: "weightTon",
    key: "weightTon",
    render: (text: number) => (
      <span className="tabular-nums text-slate-600">{text.toFixed(2)}</span>
    ),
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text: "open" | "in_progress" | "closed") => (
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClassName(text)}`}
      >
        {formatStatus(text)}
      </span>
    ),
  },

  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => (
      <span className="text-xs text-slate-500">
        {new Date(text).toLocaleString()}
      </span>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (_, record) => (
      <div className="flex items-center gap-1">
        <Button type="link" size="small" onClick={() => onEdit(record)}>
          Edit
        </Button>
        <Button
          type="link"
          danger
          size="small"
          onClick={() => onDelete(record)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];
