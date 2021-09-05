import * as S from "./styles";

import { Heading } from "components/Heading";
import { Highlight, HighlightProps } from "components/Highlight";
import { GameCardSlider } from "components/GameCardSlider";
import { GameCardProps } from "components/GameCard";

export type ShowcaseProps = {
  title?: string;
  highlight?: HighlightProps;
  games?: GameCardProps[];
};

export function Showcase({ title, highlight, games }: ShowcaseProps) {
  return (
    <S.Wrapper>
      {!!title && (
        <Heading lineLeft lineColor="secondary">
          {title}
        </Heading>
      )}

      {!!highlight && <Highlight {...highlight} />}
      {!!games && <GameCardSlider items={games} />}
    </S.Wrapper>
  );
}
