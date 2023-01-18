import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import api from "../../services/antecipationApi";
import {
  IAntecipation,
  IAntecipationContext,
  IAntecipationProviderProps,
  ISimulationRequest,
} from "./interface";

export const AntecipationContext = createContext<IAntecipationContext>(
  {} as IAntecipationContext
);

const AntecipationProvider = ({
  children,
}: IAntecipationProviderProps): JSX.Element => {
  const [antecipation, setAntecipation] = useState<IAntecipation>({});

  const simulateAntecipation = async (
    simulationRequest: ISimulationRequest
  ): Promise<void> => {
    try {
      const { data } = await api.post<IAntecipation>("", simulationRequest);

      setAntecipation(data);
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        console.log(error.cause);
      }
    }
  };

  useEffect(() => {
    console.log(antecipation);
  }, [antecipation]);

  return (
    <AntecipationContext.Provider
      value={{ antecipation, simulateAntecipation }}
    >
      {children}
    </AntecipationContext.Provider>
  );
};

export default AntecipationProvider;
