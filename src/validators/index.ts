import * as yup from "yup";
import { TransformFunction } from "yup/lib/types";
import { ISimulationRequest } from "../providers/anticipationContext/interface";

const convertCurrencyToCents: TransformFunction<yup.NumberSchema> = (
  _,
  value: string
) => {
  if (!!value) {
    const cents = value.replace(/\D/g, "");
    return +cents;
  }

  return value;
};

export const simulationSchema: yup.SchemaOf<ISimulationRequest> = yup
  .object()
  .shape({
    amount: yup
      .number()
      .transform(convertCurrencyToCents)
      .min(1000, "10 pila, porra")
      .required(),
    installments: yup
      .number()
      .required()
      .typeError("Deve ser um número")
      .min(1, "Minímo de 1 parcela")
      .max(12, "Máximo de 12 parcelas"),
    mdr: yup
      .number()
      .required()
      .typeError("Deve ser um número")
      .positive("Apenas MDR positivo")
      .max(100, "Máximo de 100% de MDR"),
  });
