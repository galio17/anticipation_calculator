import { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: HTMLInputTypeAttribute | "currency";
  error?: string;
}
