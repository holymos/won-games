import { CartButton } from "components/CartButton";
import { Heading } from "components/Heading";
import { Ribbon } from "components/Ribbon";
import { WishlistButton } from "components/WishlistButton";
import { formatPrice } from "utils/formatPrice";
import * as S from "./styles";

export type GameInfoProps = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export function GameInfo({ id, title, description, price }: GameInfoProps) {
  return (
    <S.Wrapper data-cy="game-info">
      <Heading lineBottom color="black">
        {title}
      </Heading>

      <Ribbon color="secondary">
        {price > 0 ? formatPrice(price) : "Free"}
      </Ribbon>

      <S.Description>{description}</S.Description>

      <S.ButtonsWrapper>
        <CartButton id={id} size="large" hasText />

        <WishlistButton id={id} hasText size="large" />
      </S.ButtonsWrapper>
    </S.Wrapper>
  );
}
