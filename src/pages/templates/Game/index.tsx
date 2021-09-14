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
      <S.Cover src={cover} role="image" aria-label="cover" />

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
