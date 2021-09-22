import { paymentOptionsMock } from "components/PaymentOptions/mock";
import { QueryRecommended } from "graphql/generated/QueryRecommended";
import { QUERY_RECOMMENDED } from "graphql/queries/recommended";
import { initializeApollo } from "utils/apollo";
import { gamesMapper, highlightMapper } from "utils/mappers";
import { Cart, CartTemplateProps } from "./templates/Cart";

export default function CartPage(props: CartTemplateProps) {
  return <Cart {...props} />;
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  });

  return {
    props: {
      recommendedTitle: data.recommendedGame?.group?.title,
      recommendedGames: gamesMapper(data.recommendedGame?.group?.games),
      recommendedHighlight: highlightMapper(
        data.recommendedGame?.group?.highlight
      ),
      cards: paymentOptionsMock
    }
  };
}
