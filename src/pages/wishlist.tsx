import { GetServerSidePropsContext } from "next";
import { QueryRecommended } from "graphql/generated/QueryRecommended";
import { QUERY_RECOMMENDED } from "graphql/queries/recommended";
import { initializeApollo } from "utils/apollo";

import { gamesMapper, highlightMapper } from "utils/mappers";

import { gamesMock } from "components/GameCardSlider/mock";
import { Wishlist, WishlistTemplateProps } from "./templates/Wishlist";
import { protectedRoutes } from "utils/protectedRoutes";
import {
  QueryWishlist,
  QueryWishlistVariables
} from "graphql/generated/QueryWishlist";
import { QUERY_WISHLIST } from "graphql/queries/wishlist";

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);
  const apolloClient = initializeApollo(null, session);

  if (!session) return {};

  await apolloClient.query<QueryWishlist, QueryWishlistVariables>({
    query: QUERY_WISHLIST,
    variables: {
      identifier: session.user?.email as string
    }
  });

  const { data } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  });

  return {
    props: {
      session,
      initialApolloState: apolloClient.cache.extract(),
      games: gamesMock,
      recommendedGames: gamesMapper(data.recommendedGame?.group?.games),
      recommendedHighlight: highlightMapper(
        data.recommendedGame?.group?.highlight
      ),
      recommendedTitle: data.recommendedGame?.group?.title
    }
  };
}
