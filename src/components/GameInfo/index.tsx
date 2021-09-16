import {
  AddShoppingCart,
  FavoriteBorder
} from "@styled-icons/material-outlined";
import { Button } from "components/Button";
import { Heading } from "components/Heading";
import { Ribbon } from "components/Ribbon";
import { formatPrice } from "utils/formatPrice";
import * as S from "./styles";

export type GameInfoProps = {
  title: string;
  description: string;
  price: number;
};

export function GameInfo({ title, description, price }: GameInfoProps) {
  return (
    <S.Wrapper>
      <Heading lineBottom color="black">
        {title}
      </Heading>

      <Ribbon color="secondary">
        {price > 0 ? formatPrice(price) : "Free"}
      </Ribbon>

      <S.Description>{description}</S.Description>

      <S.ButtonsWrapper>
        <Button icon={<AddShoppingCart />} size="large">
          Add to cart
        </Button>

        <Button icon={<FavoriteBorder />} size="large" minimal>
          Wishlist
        </Button>
      </S.ButtonsWrapper>
    </S.Wrapper>
  );
}