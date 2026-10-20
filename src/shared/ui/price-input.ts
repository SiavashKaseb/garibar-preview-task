import { addCommas } from "@persian-tools/persian-tools";

export const formatPriceInput = (value?: string | number) => {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  return addCommas(Number(value));
};

export const parsePriceInput = (value?: string) => value?.replace(/,/g, "") ?? "";
