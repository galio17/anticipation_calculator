import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";

import { useAnticipationContext } from "../../providers";
import { ISimulationRequest } from "../../providers/anticipationContext/interface";
import { simulationSchema } from "../../validators";
import { Input } from "../Form/Input";

const SimulationForm = (): JSX.Element => {
  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ISimulationRequest>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: yupResolver(simulationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "days" as never,
    control: control,
  });

  const [simulation, setSimulation] = useState<ISimulationRequest | null>(null);
  const updateSimulation = handleSubmit(
    (data: ISimulationRequest) => {
      console.log("validation: ", data);
      setSimulation({ ...data });
    },
    (errors) => console.log(errors)
  );

  const removeDays = (index: number) => {
    remove(index);

    let days = getValues("days");
    delete days?.[index];
    if (!days?.length) {
      days = undefined;
    }
    setSimulation({ ...simulation!, days });
  };

  const { simulateAnticipation } = useAnticipationContext();
  useEffect(() => {
    console.log("simulation: ", simulation);
    const timeoutSimulationID = setTimeout(() => {
      if (simulation) simulateAnticipation(simulation);
    }, 700);

    return () => {
      clearTimeout(timeoutSimulationID);
    };
  }, [simulation]);

  return (
    <section>
      <h1>Simule Sua Antecipação</h1>
      <form onChange={updateSimulation}>
        <Input
          label="Informe o valor da venda"
          type="currency"
          id="amount"
          {...register("amount")}
          defaultValue="R$ 0,00"
          error={errors.amount?.message as string}
        />
        <Input
          label="Em quantas parcelas"
          type="number"
          id="installments"
          {...register("installments", { valueAsNumber: true })}
          error={errors.installments?.message as string}
        />
        <Input
          label="Informe o percentual de MDR"
          type="number"
          id="mdr"
          {...register("mdr", { valueAsNumber: true })}
          error={errors.mdr?.message as string}
        />
        <div>
          <div>
            <label>Período de tempo</label>
            <span>Padrão de 1, 15, 30 e 90 dias</span>
            <button
              type="button"
              onClick={() => {
                append("");
              }}
            >
              Append
            </button>
          </div>
          {fields.map(({ id }, index) => (
            <div key={id}>
              <Input
                type="number"
                {...register(`days.${index}` as const, { valueAsNumber: true })}
                error={errors.days?.[index]?.message}
              />
              <button type="button" onClick={() => removeDays(index)}>
                Remover
              </button>
            </div>
          ))}
        </div>
      </form>
    </section>
  );
};

export default SimulationForm;
