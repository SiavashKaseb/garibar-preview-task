import { z } from "zod";

const requiredText = (label: string) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(1, `${label} is required`);

const requiredPositiveNumber = (label: string) =>
  z
    .number({ error: `${label} is required` })
    .refine((value) => Number.isFinite(value), {
      message: `${label} must be a number`,
    })
    .positive(`${label} must be greater than 0`);

export const cargoOrderFormSchema = z
  .object({
    goodsName: requiredText("Goods name"),
    originCity: requiredText("Origin city"),
    destinationCity: requiredText("Destination city"),
    weightTon: requiredPositiveNumber("Weight"),
    priceRial: requiredPositiveNumber("Price").int(
      "Price must be a whole number",
    ),
    status: z.enum(["open", "in_progress", "closed"], {
      error: "Status is required",
    }),
  })
  .refine(
    (values) =>
      values.originCity.toLowerCase() !== values.destinationCity.toLowerCase(),
    {
      message: "Destination must be different from origin",
      path: ["destinationCity"],
    },
  );

export type CargoOrderFormValues = z.infer<typeof cargoOrderFormSchema>;

export type CargoOrderFormFields = {
  goodsName: string;
  originCity: string;
  destinationCity: string;
  weightTon: number | undefined;
  priceRial: number | undefined;
  status: CargoOrderFormValues["status"];
};

export const CARGO_ORDER_FORM_DEFAULTS: CargoOrderFormFields = {
  goodsName: "",
  originCity: "",
  destinationCity: "",
  weightTon: undefined,
  priceRial: undefined,
  status: "open",
};
