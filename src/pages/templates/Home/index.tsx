import { BannerProps } from "components/Banner";
import { GameCardProps } from "components/GameCard";

import { Menu } from "components/Menu";
import { Heading } from "components/Heading";
import { Footer } from "components/Footer";
import { Highlight, HighlightProps } from "components/Highlight";
import { BannerSlider } from "components/BannerSlider";
import { GameCardSlider } from "components/GameCardSlider";

import { Container } from "components/Container";

import * as S from "./styles";

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
    <section>
      <Container>
        <Menu />

        <S.SectionBanner>
          <BannerSlider items={banners} />
        </S.SectionBanner>
      </Container>

      <S.SectionNews>
        <Container>
          <Heading lineLeft lineColor="secondary">
            News
          </Heading>

          <GameCardSlider items={newGames} color="black" />
        </Container>
      </S.SectionNews>

      <Container>
        <S.SectionMostPopular>
          <Heading lineLeft lineColor="secondary">
            Most Popular
          </Heading>

          <Highlight {...mostPopularHighlight} />
          <GameCardSlider items={mostPopularGames} />
        </S.SectionMostPopular>

        <S.SectionUpcoming>
          <Heading lineLeft lineColor="secondary">
            Upcoming
          </Heading>

          <GameCardSlider items={upcomingGames} />
          <Highlight {...upcomingHighlight} />
          <GameCardSlider items={upcomingMoreGames} />
        </S.SectionUpcoming>

        <S.SectionFreeGames>
          <Heading lineLeft lineColor="secondary">
            Free games
          </Heading>
          <Highlight {...freeGamesHighlight} />
          <GameCardSlider items={freeGames} />
        </S.SectionFreeGames>
      </Container>

      <S.SectionFooter>
        <Container>
          <Footer />
        </Container>
      </S.SectionFooter>
    </section>
  );
}
