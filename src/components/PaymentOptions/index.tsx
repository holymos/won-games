import { useState } from "react";
import { Add, ShoppingCart } from "@styled-icons/material-outlined";

import { Heading } from "components/Heading";
import { Radio } from "components/Radio";
import { Button } from "components/Button";

import * as S from "./styles";

export type PaymentCard = {
  cardNumber: string;
  flag: string;
  img: string;
};

export type PaymentOptionsProps = {
  cards?: PaymentCard[];
  handlePayment: () => void;
};

export function PaymentOptions({ cards, handlePayment }: PaymentOptionsProps) {
  const [checked, setChecked] = useState(false);

  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" lineBottom size="small">
          Payment
        </Heading>

        <S.CardList>
          {cards?.map((card) => (
            <S.CardItem key={card.cardNumber}>
              <S.CardInfo>
                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={card.img} alt={card.flag} />
                }
                {card.cardNumber}
              </S.CardInfo>
              <Radio
                name="credit-card"
                id={card.cardNumber}
                value={card.cardNumber}
                onCheck={() => setChecked(true)}
              />
            </S.CardItem>
          ))}

          <S.AddCard role="button">
            <Add size={14} /> Add a new credit card
          </S.AddCard>
        </S.CardList>
      </S.Body>

      <S.Footer>
        <Button as="a" fullWidth minimal>
          Continue shopping
        </Button>

        <Button
          fullWidth
          icon={<ShoppingCart />}
          onClick={handlePayment}
          disabled={!checked}
        >
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  );
}
