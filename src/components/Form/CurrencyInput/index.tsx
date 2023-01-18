import {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";

export const CurrencyInput = forwardRef(
  (
    { onChange, ...props }: InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const handlerChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const { value } = event.target;
      const numbers = value.replace(/\D/g, "");
      const currency = +numbers / 100;
      const money = currency.toLocaleString("pt-br", {
        currency: "BRL",
        style: "currency",
      });

      event.target.value = money;

      onChange?.(event);
    };

    return <input ref={ref} {...props} onChange={handlerChange} />;
  }
);
