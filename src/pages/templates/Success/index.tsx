import { Done } from "@styled-icons/material-outlined/Done";
import Link from "next/link";

import { Base } from "../Base";

import { Container } from "components/Container";
import { GameCardProps } from "components/GameCard";
import { Showcase } from "components/Showcase";
import { HighlightProps } from "components/Highlight";

import * as S from "./styles";
import { useCart } from "hooks/useCart";
import { useEffect } from "react";

export type SuccessTemplateProps = {
  recommendedTitle: string;
  recommendedGames: GameCardProps[];
  recommendedHighlight: HighlightProps;
};

export function Success({
  recommendedTitle,
  recommendedGames,
  recommendedHighlight
}: SuccessTemplateProps) {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Base>
      <Container>
        <S.Wrapper>
          <S.Heading>Your purchase was successful!</S.Heading>

          <S.CheckMark>
            <Done />
          </S.CheckMark>

          <S.Text>
            Wait for your payment details by email. Your game is now available
            for download inside your{" "}
            <Link href="/profile/orders">
              <a>Orders List</a>
            </Link>
            . Enjoy!
          </S.Text>
        </S.Wrapper>
      </Container>

      <Showcase
        title={recommendedTitle}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  );
}
