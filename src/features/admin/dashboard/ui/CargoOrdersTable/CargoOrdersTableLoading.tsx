import { type FC } from "react";
import { Skeleton, Table, type TableColumnType } from "antd";

const SKELETON_ROW_COUNT = 8;

const Bone = ({
  width,
  height = 14,
  round = false,
}: {
  width: number;
  height?: number;
  round?: boolean;
}) => (
  <Skeleton.Button
    active
    size="small"
    shape={round ? "round" : "default"}
    style={{ width, height, minWidth: width }}
  />
);

const skeletonColumns: TableColumnType<{ key: number }>[] = [
  {
    title: "ID",
    render: () => <Bone width={42} height={22} round />,
  },
  {
    title: "Goods Name",
    render: () => <Bone width={148} />,
  },
  {
    title: "Origin City",
    render: () => <Bone width={96} />,
  },
  {
    title: "Destination City",
    render: () => <Bone width={110} />,
  },
  {
    title: "Price (Rial)",
    render: () => <Bone width={88} />,
  },
  {
    title: "Weight (Ton)",
    render: () => <Bone width={56} />,
  },
  {
    title: "Status",
    render: () => <Bone width={78} height={22} round />,
  },
  {
    title: "Created At",
    render: () => <Bone width={132} />,
  },
];

const skeletonRows = Array.from({ length: SKELETON_ROW_COUNT }, (_, key) => ({
  key,
}));

const CargoOrdersTableLoading: FC = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)]">
      <Table
        columns={skeletonColumns}
        dataSource={skeletonRows}
        pagination={false}
        rowKey="key"
      />
    </div>
  );
};

export default CargoOrdersTableLoading;
