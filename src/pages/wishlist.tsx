import { QueryRecommended } from "graphql/generated/QueryRecommended";
import { QUERY_RECOMMENDED } from "graphql/queries/recommended";
import { initializeApollo } from "utils/apollo";

import { gamesMapper, highlightMapper } from "utils/mappers";

import { gamesMock } from "components/GameCardSlider/mock";
import { Wishlist, WishlistTemplateProps } from "./templates/Wishlist";

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />;
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  });

  return {
    props: {
      games: gamesMock,
      recommendedGames: gamesMapper(data.recommendedGame?.group?.games),
      recommendedHighlight: highlightMapper(
        data.recommendedGame?.group?.highlight
      ),
      recommendedTitle: data.recommendedGame?.group?.title
    }
  };
}
