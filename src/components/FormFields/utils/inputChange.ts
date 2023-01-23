import { ChangeEventHandler } from "react";

export const inputCurrencyChange: ChangeEventHandler<HTMLInputElement> = (
  event
) => {
  const { value } = event.target;
  const numbers = value.replace(/\D/g, "");
  const currency = +numbers / 100;
  const money = currency.toLocaleString("pt-br", {
    currency: "BRL",
    style: "currency",
  });

  event.target.value = money;
};
