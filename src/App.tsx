import AnticipationList from "./components/AnticipationList";
import SimulationForm from "./components/SimulationForm";
import AnticipationProvider from "./providers/anticipationContext";

import "./styles/page.sass";

const App = (): JSX.Element => {
  return (
    <div className="page-container">
      <main>
        <AnticipationProvider>
          <SimulationForm />
          <div className="separator"></div>
          <AnticipationList />
        </AnticipationProvider>
      </main>
    </div>
  );
};

export default App;
