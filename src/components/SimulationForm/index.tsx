import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";

import { useAnticipationContext } from "../../providers";
import { ISimulationRequest } from "../../providers/anticipationContext/interface";
import { simulationSchema } from "../../validators";
import { Input, InputArray, inputCurrencyChange } from "../FormFields";

import "../../styles/components/SimulationForm.sass";

const SimulationForm = (): JSX.Element => {
  const methods = useForm<ISimulationRequest>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: yupResolver(simulationSchema),
  });
  const { handleSubmit } = methods;

  const [simulation, setSimulation] = useState<ISimulationRequest | null>(null);
  const updateSimulation = handleSubmit((data: ISimulationRequest) => {
    setSimulation({ ...data });
  });

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
    <section className="simulation-form-container">
      <h1>Simule Sua Antecipação</h1>
      <FormProvider {...methods}>
        <form onChange={updateSimulation}>
          <Input
            label="Informe o valor da venda"
            name="amount"
            onChange={inputCurrencyChange}
            defaultValue="R$ 0,00"
          />
          <Input
            label="Em quantas parcelas"
            type="number"
            name="installments"
          />
          <Input label="Informe o percentual de MDR" type="number" name="mdr" />
          <InputArray
            label="Período de tempo"
            subtitle="Padrão de 1, 15, 30 e 90 dias"
            name="days"
            onAdd={updateSimulation}
            onRemove={updateSimulation}
            addButton={<HiOutlinePlusCircle />}
            removeButton={<HiOutlineMinusCircle />}
          />
        </form>
      </FormProvider>
    </section>
  );
};

export default SimulationForm;
