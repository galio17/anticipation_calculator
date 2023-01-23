import { IAnticipationCardProps } from "./interface";

const AnticipationCard = ({
  anticipation: [days, cents],
}: IAnticipationCardProps) => {
  const period = +days === 1 ? "Amanhã" : `Em ${days} dias`;

  const formatCentsInMoney = (cents: number) => {
    const money = cents / 100;
    return money.toLocaleString("pt-br", {
      currency: "BRL",
      style: "currency",
    });
  };

  return (
    <li>
      {period}: <strong>{formatCentsInMoney(cents)}</strong>
    </li>
  );
};

export default AnticipationCard;
