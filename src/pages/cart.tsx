import { QueryRecommended } from "graphql/generated/QueryRecommended";
import { QUERY_RECOMMENDED } from "graphql/queries/recommended";
import { GetServerSidePropsContext } from "next";
import { initializeApollo } from "utils/apollo";
import { gamesMapper, highlightMapper } from "utils/mappers";
import { protectedRoutes } from "utils/protectedRoutes";
import { Cart, CartTemplateProps } from "templates/Cart";

export default function CartPage(props: CartTemplateProps) {
  return <Cart {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);
  const apolloClient = initializeApollo(null, session);

  const { data } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  });

  return {
    props: {
      session,
      recommendedTitle: data.recommendedGame?.group?.title,
      recommendedGames: gamesMapper(data.recommendedGame?.group?.games),
      recommendedHighlight: highlightMapper(
        data.recommendedGame?.group?.highlight
      )
    }
  };
}
