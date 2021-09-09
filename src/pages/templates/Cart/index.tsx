import { Base } from "../Base";
import { Container } from "components/Container";
import { Divider } from "components/Divider";

import { GameCardProps } from "components/GameCard";
import { HighlightProps } from "components/Highlight";

import { CartList, CartListProps } from "components/CartList";
import { Heading } from "components/Heading";
import { Showcase } from "components/Showcase";
import { PaymentOptions, PaymentOptionsProps } from "components/PaymentOptions";

import * as S from "./styles";
import { Empty } from "components/Empty";

export type CartTemplateProps = {
  recommendedGames: GameCardProps[];
  recommendedHighlight: HighlightProps;
} & CartListProps &
  Pick<PaymentOptionsProps, "cards">;

export function Cart({
  recommendedGames,
  recommendedHighlight,
  items,
  total,
  cards
}: CartTemplateProps) {
  const handlePayment = () => ({});

  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My cart
        </Heading>

        {items.length ? (
          <S.Content>
            <CartList items={items} total={total} />
            <PaymentOptions cards={cards} handlePayment={handlePayment} />
          </S.Content>
        ) : (
          <Empty
            title="Your cart is empty"
            description="Go back to the store and explore the offers"
            hasLink
          />
        )}

        <Divider />
      </Container>

      <Showcase
        title="You may like these games"
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  );
}
