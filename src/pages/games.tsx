import { initializeApollo } from "utils/apollo";
import { QueryGames, QueryGamesVariables } from "graphql/generated/QueryGames";
import { QUERY_GAMES } from "graphql/queries/games";

import { Games, GamesTemplateProps } from "./templates/Games";
import { exploreSidebarMock } from "components/ExploreSidebar/mock";

export default function GamesPage(props: GamesTemplateProps) {
  return <Games {...props} />;
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: {
      limit: 9
    }
  });

  return {
    props: {
      revalidate: 60,
      games: data.games.map((game) => ({
        slug: game.slug,
        title: game.name,
        developer: game.developers[0].name,
        img: `http://localhost:1337${game.cover!.url}`,
        price: game.price
      })),
      filterItems: exploreSidebarMock
    }
  };
}
