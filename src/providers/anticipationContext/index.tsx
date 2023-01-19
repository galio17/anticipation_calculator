import { AxiosError } from "axios";
import { createContext, useState } from "react";
import api from "../../services/anticipationApi";
import {
  Anticipation,
  IAnticipationContext,
  IAnticipationProviderProps,
  ISimulationRequest,
  ISimulationResponse,
} from "./interface";

export const AnticipationContext = createContext<IAnticipationContext>(
  {} as IAnticipationContext
);

const AnticipationProvider = ({
  children,
}: IAnticipationProviderProps): JSX.Element => {
  const [anticipationList, setAnticipationList] = useState<Anticipation[]>([]);

  const simulateAnticipation = async (
    simulationRequest: ISimulationRequest
  ): Promise<void> => {
    try {
      const { data } = await api.post<ISimulationResponse>(
        "",
        simulationRequest
      );

      setAnticipationList(Object.entries(data));
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        console.log(error.cause);
      }
    }
  };

  return (
    <AnticipationContext.Provider
      value={{ anticipationList, simulateAnticipation }}
    >
      {children}
    </AnticipationContext.Provider>
  );
};

export default AnticipationProvider;
