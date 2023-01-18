import { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { useAntecipationContext } from "../../providers";
import { ISimulationRequest } from "../../providers/anticipationContext/interface";
import { simulationSchema } from "../../validators";
import { Input } from "../Form/Input";

const SimulationForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISimulationRequest>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: yupResolver(simulationSchema),
  });

  const [simulation, setSimulation] = useState<ISimulationRequest | null>(null);
  const updateSimulation = handleSubmit(
    (data: ISimulationRequest) => {
      setSimulation({ ...data });
    },
    (errors) => console.log(errors)
  );

  const { simulateAntecipation } = useAntecipationContext();
  useEffect(() => {
    const timeoutSimulationID = setTimeout(() => {
      if (simulation) simulateAntecipation(simulation);
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
          {...register("amount")}
          defaultValue="R$ 0,00"
          error={errors.amount?.message}
        />
        <Input
          label="Em quantas parcelas"
          type="number"
          {...register("installments", { valueAsNumber: true })}
          error={errors.installments?.message}
        />
        <Input
          label="Informe o percentual de MDR"
          type="number"
          {...register("mdr", { valueAsNumber: true })}
          error={errors.mdr?.message}
        />
      </form>
    </section>
  );
};

export default SimulationForm;
