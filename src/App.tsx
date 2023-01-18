import SimulationForm from "./components/SimulationForm";
import AntecipationProvider from "./providers/anticipationContext";

const App = (): JSX.Element => {
  return (
    <div>
      <main>
        <AntecipationProvider>
          <SimulationForm />
        </AntecipationProvider>
      </main>
    </div>
  );
};

export default App;
