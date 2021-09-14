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
  newGamesTitle: string;
  newGames: GameCardProps[];
  mostPopularGamesTitle: string;
  mostPopularHighlight: HighlightProps;
  mostPopularGames: GameCardProps[];
  upcomingGamesTitle: string;
  upcomingGames: GameCardProps[];
  upcomingHighlight: HighlightProps;
  freeGamesTitle: string;
  freeGamesHighlight: HighlightProps;
  freeGames: GameCardProps[];
};

export function Home({
  banners,
  newGamesTitle,
  newGames,
  mostPopularGamesTitle,
  mostPopularHighlight,
  mostPopularGames,
  upcomingGamesTitle,
  upcomingGames,
  upcomingHighlight,
  freeGamesTitle,
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
        <Showcase title={newGamesTitle} games={newGames} color="black" />
      </S.SectionNews>

      <Showcase
        title={mostPopularGamesTitle}
        highlight={mostPopularHighlight}
        games={mostPopularGames}
      />

      <Showcase
        title={upcomingGamesTitle}
        games={upcomingGames}
        highlight={upcomingHighlight}
      />

      <Showcase
        title={freeGamesTitle}
        highlight={freeGamesHighlight}
        games={freeGames}
      />
    </Base>
  );
}
