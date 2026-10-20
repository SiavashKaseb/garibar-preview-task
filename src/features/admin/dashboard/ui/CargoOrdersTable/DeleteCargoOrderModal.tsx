import { type FC } from "react";
import { Button, Modal, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CargoOrder } from "@/features/admin/dashboard/model/types";

import { deleteCargoOrderMutationOptions } from "@/features/admin/dashboard/api/delete-cargo-orders/delete-cargo-order.mutation";
import { CargoKeys } from "@/shared/api/query-keys/admin/cargo.keys";
import { formatPriceInput } from "@/shared/ui/price-input";

interface DeleteCargoOrderModalProps {
  open: boolean;
  order: CargoOrder | null;
  onClose: () => void;
}

const DeleteCargoOrderModal: FC<DeleteCargoOrderModalProps> = ({
  open,
  order,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const deleteOrder = useMutation(deleteCargoOrderMutationOptions);

  const handleDelete = () => {
    if (!order) {
      return;
    }

    deleteOrder.mutate(order.id, {
      onSuccess: (res) => {
        console.log({ res });
        queryClient.invalidateQueries({ queryKey: CargoKeys.orders() });
        message.success(res.message || "Cargo order deleted");
        onClose();
      },
      onError: (error) => {
        message.error(error.message || "Could not delete cargo order");
      },
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      width={440}
      className="dashboard-modal"
      title={
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-500">
            Danger zone
          </p>
          <span>Delete cargo order</span>
        </div>
      }
    >
      <p className="mt-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm leading-6 text-slate-600">
        Delete{" "}
        <span className="font-semibold text-slate-800">
          {order?.goodsName ?? "this order"}
        </span>
        {order ? <span className="text-slate-400"> #{order.id}</span> : null}
        {order ? (
          <>
            {" "}
            for{" "}
            <span className="font-semibold text-slate-800">
              {formatPriceInput(order.priceRial)}
            </span>{" "}
            rial
          </>
        ) : null}
        ? This action cannot be undone.
      </p>

      <div className="mt-6 flex justify-end gap-2">
        <Button onClick={onClose} disabled={deleteOrder.isPending}>
          Cancel
        </Button>
        <Button
          type="primary"
          danger
          loading={deleteOrder.isPending}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteCargoOrderModal;
