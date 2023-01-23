import { ChangeEventHandler } from "react";

import { useFormContext } from "react-hook-form";

import { IInputProps } from "./interface";

import "../../../styles/components/Input.sass";

export const Input = ({
  label,
  onChange,
  name,
  id = name,
  children,
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
    <div className="input-container">
      {!!label && <label htmlFor={name}>{label}</label>}
      <div>
        <input
          {...props}
          {...inputFormProps}
          onChange={handlerChange}
          id={id}
        />
        {children}
      </div>
      {!!error?.message && <span className="error">{error.message}</span>}
    </div>
  );
};
