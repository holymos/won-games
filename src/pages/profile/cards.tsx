import { CardList, CardListProps } from "components/CardList";
import { paymentOptionsMock } from "components/PaymentOptions/mock";
import { Profile } from "pages/templates/Profile";

export default function Cards({ cards }: CardListProps) {
  return (
    <Profile>
      <CardList cards={cards} />
    </Profile>
  );
}

export function getServerSideProps() {
  return {
    props: {
      cards: paymentOptionsMock
    }
  };
}
