import { Base } from "../Base";

import { BannerProps } from "components/Banner";
import { GameCardProps } from "components/GameCard";

import { HighlightProps } from "components/Highlight";
import { BannerSlider } from "components/BannerSlider";

import { Container } from "components/Container";

import * as S from "./styles";
import { Showcase } from "components/Showcase";

export type HomeTemplateProps = {
  banners: BannerProps[];
  newGames: GameCardProps[];
  mostPopularHighlight: HighlightProps;
  mostPopularGames: GameCardProps[];
  upcomingGames: GameCardProps[];
  upcomingHighlight: HighlightProps;
  upcomingMoreGames: GameCardProps[];
  freeGamesHighlight: HighlightProps;
  freeGames: GameCardProps[];
};

export function Home({
  banners,
  newGames,
  mostPopularHighlight,
  mostPopularGames,
  upcomingGames,
  upcomingHighlight,
  upcomingMoreGames,
  freeGamesHighlight,
  freeGames
}: HomeTemplateProps) {
  return (
    <Base>
      <Container>
        <S.SectionBanner>
          <BannerSlider items={banners} />
        </S.SectionBanner>
      </Container>

      <S.SectionNews>
        <Showcase title="News" games={newGames} />
      </S.SectionNews>

      <Showcase
        title="Most popular"
        highlight={mostPopularHighlight}
        games={mostPopularGames}
      />

      <S.SectionUpcoming>
        <Showcase title="Upcoming" games={upcomingGames} />
        <Showcase highlight={upcomingHighlight} games={upcomingMoreGames} />
      </S.SectionUpcoming>

      <Showcase
        title="Free games"
        highlight={freeGamesHighlight}
        games={freeGames}
      />
    </Base>
  );
}
