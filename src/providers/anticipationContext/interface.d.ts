import { ReactNode } from "react";

interface IAnticipationProviderProps {
  children: ReactNode;
}

interface ISimulationRequest {
  amount: number;
  installments: number;
  mdr: number;
  days?: number[];
}

interface ISimulationResponse {
  [key in string]: number;
}

type Anticipation = [string, number];

interface IAnticipationContext {
  anticipationList: Anticipation[];
  simulateAnticipation: (
    simulationRequest: ISimulationRequest
  ) => Promise<void>;
}
