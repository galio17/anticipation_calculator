import { ReactNode } from "react";

interface IAntecipationProviderProps {
  children: ReactNode;
}

interface ISimulationRequest {
  amount: number;
  installments: number;
  mdr: number;
}

interface IAntecipation {
  [key in number]: number;
}

interface IAntecipationContext {
  antecipation: IAntecipation;
  simulateAntecipation: (
    simulationRequest: ISimulationRequest
  ) => Promise<void>;
}
