import { KeyboardArrowDown as ArrowDown } from "@styled-icons/material-outlined";
import { useQueryGames } from "graphql/queries/games";

import { Base } from "../Base";
import { ExploreSidebar, ItemProps } from "components/ExploreSidebar";
import { GameCard, GameCardProps } from "components/GameCard";
import { Grid } from "components/Grid";

import * as S from "./styles";

export type GamesTemplateProps = {
  games?: GameCardProps[];
  filterItems: ItemProps[];
};

export function Games({ filterItems }: GamesTemplateProps) {
  const { data, fetchMore, loading } = useQueryGames({
    variables: {
      limit: 15
    }
  });

  function handleFilter() {
    return;
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
        <ExploreSidebar onFilter={handleFilter} items={filterItems} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <section>
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

            <S.ShowMore role="button" onClick={handleShowMore}>
              <p>Show more</p>
              <ArrowDown size={35} />
            </S.ShowMore>
          </section>
        )}
      </S.Main>
    </Base>
  );
}
