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

  await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: {
      limit: 15
    }
  });

  return {
    props: {
      revalidate: 60,
      initialApolloState: apolloClient.cache.extract(),
      filterItems: exploreSidebarMock
    }
  };
}
