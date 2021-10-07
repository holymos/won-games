import { initializeApollo } from "utils/apollo";
import { QueryGames, QueryGamesVariables } from "graphql/generated/QueryGames";
import { QUERY_GAMES } from "graphql/queries/games";
import { parseQueryStringToWhere } from "utils/filter";

import { Games, GamesTemplateProps } from "templates/Games";
import { GetServerSidePropsContext } from "next";
import {
  genreFields,
  platformFields,
  priceFields,
  sortFields
} from "utils/filter/fields";
import { ItemProps } from "components/ExploreSidebar";

export default function GamesPage(props: GamesTemplateProps) {
  return <Games {...props} />;
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();

  const filterPrice: ItemProps = {
    title: "Price",
    name: "price_lte",
    type: "radio",
    fields: priceFields
  };

  const filterPlatforms: ItemProps = {
    title: "Platforms",
    name: "platforms",
    type: "checkbox",
    fields: platformFields
  };

  const filterSort: ItemProps = {
    title: "Sort by price",
    name: "sort",
    type: "radio",
    fields: sortFields
  };

  const filterCategories: ItemProps = {
    title: "Genres",
    name: "categories",
    type: "checkbox",
    fields: genreFields
  };

  const filterItems: ItemProps[] = [
    filterSort,
    filterPrice,
    filterPlatforms,
    filterCategories
  ];

  await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: query.sort as string | null
    }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      filterItems
    }
  };
}
