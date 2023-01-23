import { MouseEvent, MouseEventHandler } from "react";

import { useFieldArray } from "react-hook-form";

import { Input } from "../Input";
import { IInputArrayProps } from "./interface";

import "../../../styles/components/InputArray.sass";

export const InputArray = ({
  name,
  label,
  subtitle,
  onAdd,
  addButton,
  onRemove,
  removeButton,
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
    <div className="input-array-container">
      <div>
        <div>
          {!!label && <label>{label}</label>}
          {!!subtitle && <span>{subtitle}</span>}
        </div>
        <button type="button" onClick={handlerAdd}>
          {addButton ?? "Adicionar"}
        </button>
      </div>
      {fields.map(({ id }, index) => (
        <div key={id}>
          <Input name={`${name}.${index}`} {...props}>
            <button
              type="button"
              onClick={(event) => {
                handlerRemove(event, index);
              }}
            >
              {removeButton ?? "Remover"}
            </button>
          </Input>
        </div>
      ))}
    </div>
  );
};
