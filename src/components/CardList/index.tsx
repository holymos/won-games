import { Heading } from "components/Heading";
import { PaymentCard } from "components/PaymentOptions";
import * as S from "./styles";

export type CardListProps = {
  cards?: PaymentCard[];
};

export function CardList({ cards }: CardListProps) {
  return (
    <>
      <Heading lineBottom color="black" size="small">
        My cards
      </Heading>

      {cards?.map((card) => (
        <S.Card key={card.cardNumber}>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img src={card.img} alt={card.flag} />
          }
          <span>{card.cardNumber}</span>
        </S.Card>
      ))}
    </>
  );
}
