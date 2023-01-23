import { MouseEventHandler, ReactNode } from "react";
import { IInputBaseProps } from "../utils/interface";

interface IInputArrayProps extends IInputBaseProps {
  subtitle?: string;
  onAdd?: MouseEventHandler<HTMLButtonElement>;
  addButton?: ReactNode;
  onRemove?: (event?: MouseEvent<HTMLButtonElement>, index?: number) => void;
  removeButton?: ReactNode;
}
