import AnticipationList from "./components/AnticipationList";
import SimulationForm from "./components/SimulationForm";
import AnticipationProvider from "./providers/anticipationContext";

const App = (): JSX.Element => {
  return (
    <div>
      <main>
        <AnticipationProvider>
          <SimulationForm />
          <AnticipationList />
        </AnticipationProvider>
      </main>
    </div>
  );
};

export default App;
