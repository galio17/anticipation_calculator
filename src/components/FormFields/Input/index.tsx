import { ChangeEventHandler } from "react";

import { useFormContext } from "react-hook-form";

import { IInputProps } from "./interface";

export const Input = ({
  label,
  onChange,
  name,
  id = name,
  ...props
}: IInputProps) => {
  const { register, getFieldState, formState } = useFormContext();
  formState.isSubmitted;

  const inputFormProps = register(name);
  const handlerChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event);
    inputFormProps.onChange(event);
  };

  const { error } = getFieldState(name);

  return (
    <div>
      {!!label && <label htmlFor={name}>{label}</label>}
      <input {...props} {...inputFormProps} onChange={handlerChange} id={id} />
      {!!error?.message && <span>{error.message}</span>}
    </div>
  );
};
