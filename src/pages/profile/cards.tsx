import { GetServerSidePropsContext } from "next";
import { protectedRoutes } from "utils/protectedRoutes";

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  return {
    props: {
      session,
      cards: paymentOptionsMock
    }
  };
}
