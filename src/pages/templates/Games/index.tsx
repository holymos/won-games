import { KeyboardArrowDown as ArrowDown } from "@styled-icons/material-outlined";
import { ExploreSidebar, ItemProps } from "components/ExploreSidebar";
import { GameCard, GameCardProps } from "components/GameCard";
import { Grid } from "components/Grid";
import { Base } from "../Base";

import * as S from "./styles";

export type GamesTemplateProps = {
  games?: GameCardProps[];
  filterItems: ItemProps[];
};

export function Games({ games = [], filterItems }: GamesTemplateProps) {
  function handleFilter() {
    return;
  }

  function handleShowMore() {
    return;
  }

  return (
    <Base>
      <S.Main>
        <ExploreSidebar onFilter={handleFilter} items={filterItems} />

        <section>
          <Grid>
            {games.map((game) => (
              <GameCard key={game.title} {...game} />
            ))}
          </Grid>

          <S.ShowMore role="button" onClick={handleShowMore}>
            <p>Show more</p>
            <ArrowDown size={35} />
          </S.ShowMore>
        </section>
      </S.Main>
    </Base>
  );
}
