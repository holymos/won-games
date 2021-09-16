import { useRouter } from "next/router";
import {
  parseQueryStringToFilter,
  parseQueryStringToWhere
} from "utils/filter";
import { useQueryGames } from "graphql/queries/games";

import { KeyboardArrowDown as ArrowDown } from "@styled-icons/material-outlined";

import { Base } from "../Base";
import { ExploreSidebar, ItemProps } from "components/ExploreSidebar";
import { GameCard } from "components/GameCard";
import { Grid } from "components/Grid";

import * as S from "./styles";
import { ParsedUrlQueryInput } from "querystring";
import { Empty } from "components/Empty";

export type GamesTemplateProps = {
  filterItems: ItemProps[];
};

export function Games({ filterItems }: GamesTemplateProps) {
  const { push, query } = useRouter();

  const { data, fetchMore, loading } = useQueryGames({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: query.sort as string | null
    }
  });

  if (!data) return <S.ShowMoreLoading />;

  const { games, gamesConnection } = data;

  const hasMoreGames = games.length < (gamesConnection?.values?.length || 0);

  function handleFilter(items: ParsedUrlQueryInput) {
    push({
      pathname: "/games",
      query: items
    });
  }

  function handleShowMore() {
    fetchMore({
      variables: {
        limit: 15,
        start: data?.games.length
      }
    });
  }

  return (
    <Base>
      <S.Main>
        <ExploreSidebar
          onFilter={handleFilter}
          items={filterItems}
          initialValues={parseQueryStringToFilter({
            queryString: query,
            filterItems
          })}
        />

        <section>
          {data?.games.length ? (
            <>
              <Grid>
                {data?.games.map((game) => (
                  <GameCard
                    key={game.slug}
                    slug={game.slug}
                    title={game.name}
                    developer={game.developers[0].name}
                    img={`http://localhost:1337${game.cover!.url}`}
                    price={game.price}
                  />
                ))}
              </Grid>

              {hasMoreGames && (
                <S.ShowMore>
                  {!loading ? (
                    <S.ShowMoreButton role="button" onClick={handleShowMore}>
                      <p>Show more</p>
                      <ArrowDown size={35} />
                    </S.ShowMoreButton>
                  ) : (
                    <S.ShowMoreLoading
                      src="/img/dots.svg"
                      alt="Loading more games"
                    />
                  )}
                </S.ShowMore>
              )}
            </>
          ) : (
            <Empty
              title=":("
              description="No games were found with this filter"
            />
          )}
        </section>
      </S.Main>
    </Base>
  );
}
