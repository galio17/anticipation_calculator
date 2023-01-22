import { MouseEventHandler } from "react";
import { IInputBaseProps } from "../utils/interface";

interface IInputArrayProps extends IInputBaseProps {
  subtitle?: string;
  onAdd?: MouseEventHandler<HTMLButtonElement>;
  onRemove?: (index: number, event: MouseEvent<HTMLButtonElement>) => void;
}
