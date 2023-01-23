import { useAnticipationContext } from "../../providers";
import AnticipationCard from "./AnticipationCard";

const AnticipationList = () => {
  const { anticipationList } = useAnticipationContext();

  return (
    <section>
      <h2>Você receberá:</h2>
      <ul>
        {anticipationList.map((anticipation, index) => (
          <AnticipationCard key={index} anticipation={anticipation} />
        ))}
      </ul>
    </section>
  );
};

export default AnticipationList;
