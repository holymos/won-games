import { ShoppingCart } from "@styled-icons/material-outlined";

import * as S from "./styles";

export type CartIconProps = {
  quantity?: number;
};

export function CartIcon({ quantity = 0 }: CartIconProps) {
  return (
    <S.Wrapper>
      {quantity > 0 && <S.Badge aria-label="Cart items">{quantity}</S.Badge>}
      <ShoppingCart aria-label="Shopping cart" />
    </S.Wrapper>
  );
}
