import Image from "next/image";
import { Button } from "components/Button";
import * as S from "./styles";

export type HighlightProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonLink: string;
  backgroundImg: string;
  floatImg?: string;
  alignment?: "right" | "left";
};

export function Highlight({
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  backgroundImg,
  floatImg,
  alignment = "right"
}: HighlightProps) {
  return (
    <S.Wrapper alignment={alignment} data-cy="highlight">
      <Image src={backgroundImg} alt={title} layout="fill" />
      {!!floatImg && (
        <S.FloatImageWrapper>
          <Image src={floatImg} alt={title} width={400} height={300} />
        </S.FloatImageWrapper>
      )}
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>

        <Button as="a" href={buttonLink}>
          {buttonLabel}
        </Button>
      </S.Content>
    </S.Wrapper>
  );
}
