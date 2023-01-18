import { ForwardedRef, forwardRef } from "react";
import { CurrencyInput } from "../CurrencyInput";
import { IInputProps } from "./interface";

export const Input = forwardRef(
  (
    { label, error, ...props }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { id, type } = props;

    const Field =
      type === "currency" ? (
        <CurrencyInput ref={ref} {...props} />
      ) : (
        <input ref={ref} {...props} />
      );

    return (
      <div>
        {!!label && <label htmlFor={id}>{label}</label>}
        {Field}
        {!!error && <span>{error}</span>}
      </div>
    );
  }
);
