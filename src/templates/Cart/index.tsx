import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Base } from "../Base";
import { Container } from "components/Container";
import { Divider } from "components/Divider";

import { GameCardProps } from "components/GameCard";
import { HighlightProps } from "components/Highlight";

import { CartList, CartListProps } from "components/CartList";
import { Heading } from "components/Heading";
import { Showcase } from "components/Showcase";
import { PaymentForm } from "components/PaymentForm";

import * as S from "./styles";
import { Session } from "next-auth";

export type CartTemplateProps = {
  session: Session;
  recommendedTitle: string;
  recommendedGames: GameCardProps[];
  recommendedHighlight: HighlightProps;
} & CartListProps;

const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

export function Cart({
  session,
  recommendedTitle = "You may like these games",
  recommendedGames,
  recommendedHighlight
}: CartTemplateProps) {
  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My cart
        </Heading>

        <S.Content>
          <CartList />

          <Elements stripe={stripe}>
            <PaymentForm session={session} />
          </Elements>
        </S.Content>

        <Divider />
      </Container>

      <Showcase
        title={recommendedTitle}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  );
}
