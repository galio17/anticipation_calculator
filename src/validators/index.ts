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
      .required("Campo obrigatório")
      .transform(convertCurrencyToCents)
      .min(1000, "Minímo de R$ 10,00"),
    installments: yup
      .number()
      .required("Campo obrigatório")
      .typeError("Campo obrigatório")
      .min(1, "Minímo de 1 parcela")
      .max(12, "Máximo de 12 parcelas"),
    mdr: yup
      .number()
      .required("Campo obrigatório")
      .typeError("Campo obrigatório")
      .positive("Apenas MDR positivo")
      .max(100, "Máximo de 100% de MDR"),
    days: yup
      .array()
      .of(
        yup
          .number()
          .required("Campo obrigatório")
          .typeError("Campo obrigatório")
      )
      .notRequired()
      .transform((value: number[]) => {
        if (value.length) {
          return value;
        }
      }),
  });
