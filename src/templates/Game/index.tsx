import { NextSeo } from "next-seo";
import Image from "next/image";
import { Base } from "../Base";
import { Divider } from "components/Divider";
import { Gallery, GalleryImageProps } from "components/Gallery";
import { GameCardProps } from "components/GameCard";
import { GameDetails, GameDetailsProps } from "components/GameDetails";
import { GameInfo, GameInfoProps } from "components/GameInfo";
import { HighlightProps } from "components/Highlight";
import { Showcase } from "components/Showcase";
import { TextContent } from "components/TextContent";

import * as S from "./styles";

export type GameTemplateProps = {
  slug: string;
  cover: string;
  gameInfo: GameInfoProps;
  gallery?: GalleryImageProps[];
  description: string;
  details: GameDetailsProps;
  upcomingGames: GameCardProps[];
  upcomingHighlight: HighlightProps;
  upcomingTitle: string;
  recommendedTitle: string;
  recommendedGames: GameCardProps[];
};

export function Game({
  slug,
  cover,
  gameInfo,
  gallery,
  description,
  details,
  upcomingTitle,
  upcomingGames,
  upcomingHighlight,
  recommendedTitle = "You may like these games",
  recommendedGames
}: GameTemplateProps) {
  return (
    <Base>
      <NextSeo
        title={`${gameInfo.title} - Won Games`}
        description={gameInfo.description}
        canonical={`https://www.wongames.moses.com.br/${slug}`}
        openGraph={{
          url: `https://www.wongames.moses.com.br/${slug}`,
          title: `${gameInfo.title} - Won Games`,
          description: gameInfo.description,
          images: [
            {
              url: cover,
              alt: gameInfo.title
            }
          ]
        }}
      />

      <S.Cover>
        <Image src={cover} alt={gameInfo.title} layout="fill" />
      </S.Cover>

      <S.Main>
        <S.SectionGameInfo>
          <GameInfo {...gameInfo} />
        </S.SectionGameInfo>

        <S.SectionGallery>
          {!!gallery && <Gallery items={gallery} />}
        </S.SectionGallery>

        <S.SectionDescription>
          <TextContent title="Description" content={description} />
        </S.SectionDescription>

        <S.SectionGameDetails>
          <GameDetails {...details} />
          <Divider />
        </S.SectionGameDetails>

        <Showcase
          title={upcomingTitle}
          games={upcomingGames}
          highlight={upcomingHighlight}
        />
        <Showcase title={recommendedTitle} games={recommendedGames} />
      </S.Main>
    </Base>
  );
}
