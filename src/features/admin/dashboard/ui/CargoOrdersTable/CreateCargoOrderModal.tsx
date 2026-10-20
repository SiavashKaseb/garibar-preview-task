import { type FC, useEffect } from "react";
import { Button, Input, InputNumber, Modal, Select, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CARGO_ORDER_FORM_DEFAULTS,
  cargoOrderFormSchema,
  type CargoOrderFormValues,
} from "@/features/admin/dashboard/model/cargo-order-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCargoOrderMutationOptions } from "@/features/admin/dashboard/api/create-cargo-orders/create-cargo-order.mutation";
import { CargoKeys } from "@/shared/api/query-keys/admin/cargo.keys";
import Field from "@/shared/ui/field";
import { formatPriceInput, parsePriceInput } from "@/shared/ui/price-input";

interface CreateCargoOrderModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateCargoOrderModal: FC<CreateCargoOrderModalProps> = ({
  open,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const createOrder = useMutation(createCargoOrderMutationOptions);
  const { control, handleSubmit, reset } = useForm<CargoOrderFormValues>({
    resolver: zodResolver(cargoOrderFormSchema),
    defaultValues: CARGO_ORDER_FORM_DEFAULTS,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (open) {
      reset(CARGO_ORDER_FORM_DEFAULTS);
    }
  }, [open, reset]);

  const onSubmit = (values: CargoOrderFormValues) => {
    createOrder.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CargoKeys.orders() });
        message.success("Cargo order created");
        onClose();
      },
      onError: (error) => {
        message.error(error.message || "Could not create cargo order");
      },
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      width={560}
      className="dashboard-modal"
      title={
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700">
            New shipment
          </p>
          <span>Create cargo order</span>
        </div>
      }
    >
      <form
        className="mt-4 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="goodsName"
          control={control}
          render={({ field, fieldState }) => (
            <Field label="Goods name" error={fieldState.error?.message}>
              <Input
                {...field}
                placeholder="Steel coils"
                status={fieldState.error ? "error" : undefined}
              />
            </Field>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="originCity"
            control={control}
            render={({ field, fieldState }) => (
              <Field label="Origin city" error={fieldState.error?.message}>
                <Input
                  {...field}
                  placeholder="Tehran"
                  status={fieldState.error ? "error" : undefined}
                />
              </Field>
            )}
          />

          <Controller
            name="destinationCity"
            control={control}
            render={({ field, fieldState }) => (
              <Field label="Destination city" error={fieldState.error?.message}>
                <Input
                  {...field}
                  placeholder="Isfahan"
                  status={fieldState.error ? "error" : undefined}
                />
              </Field>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="weightTon"
            control={control}
            render={({ field, fieldState }) => (
              <Field label="Weight (ton)" error={fieldState.error?.message}>
                <InputNumber
                  {...field}
                  className="w-full"
                  min={0}
                  step={0.01}
                  placeholder="18"
                  status={fieldState.error ? "error" : undefined}
                />
              </Field>
            )}
          />

          <Controller
            name="priceRial"
            control={control}
            render={({ field, fieldState }) => (
              <Field label="Price (rial)" error={fieldState.error?.message}>
                <InputNumber
                  {...field}
                  className="w-full"
                  min={0}
                  step={1}
                  placeholder={formatPriceInput(85000000)}
                  formatter={formatPriceInput}
                  parser={parsePriceInput}
                  status={fieldState.error ? "error" : undefined}
                />
              </Field>
            )}
          />
        </div>

        <Controller
          name="status"
          control={control}
          render={({ field, fieldState }) => (
            <Field label="Status" error={fieldState.error?.message}>
              <Select
                {...field}
                className="w-full"
                options={[
                  { value: "open", label: "Open" },
                  { value: "in_progress", label: "In Progress" },
                  { value: "closed", label: "Closed" },
                ]}
                status={fieldState.error ? "error" : undefined}
              />
            </Field>
          )}
        />

        <div className="mt-2 flex justify-end gap-2">
          <Button onClick={onClose} disabled={createOrder.isPending}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={createOrder.isPending}
          >
            Create order
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCargoOrderModal;
