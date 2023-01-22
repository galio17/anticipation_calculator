import { MouseEvent, MouseEventHandler } from "react";

import { useFieldArray } from "react-hook-form";

import { Input } from "../Input";
import { IInputArrayProps } from "./interface";

export const InputArray = ({
  name,
  label,
  subtitle,
  onAdd,
  onRemove,
  ...props
}: IInputArrayProps) => {
  const { fields, append, remove } = useFieldArray({
    name,
  });

  const handlerAdd: MouseEventHandler<HTMLButtonElement> = (event) => {
    append("");

    onAdd?.(event);
  };

  const handlerRemove = (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    remove(index);
    onRemove?.(index, event);
  };

  return (
    <div>
      <div>
        {!!label && <label>{label}</label>}
        {!!subtitle && <span>{subtitle}</span>}
        <button type="button" onClick={handlerAdd}>
          Append
        </button>
      </div>
      {fields.map(({ id }, index) => (
        <div key={id}>
          <Input name={`${name}.${index}`} {...props} />
          <button
            type="button"
            onClick={(event) => {
              handlerRemove(event, index);
            }}
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
};
