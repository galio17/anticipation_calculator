import { InputHTMLAttributes } from "react";

interface IInputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  options?: RegisterOptions;
}
