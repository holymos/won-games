import { ShoppingCart } from "@styled-icons/material-outlined";
import { useCart } from "hooks/useCart";

import * as S from "./styles";

export function CartIcon() {
  const { quantity } = useCart();

  return (
    <S.Wrapper>
      {quantity > 0 && <S.Badge aria-label="Cart items">{quantity}</S.Badge>}
      <ShoppingCart aria-label="Shopping cart" />
    </S.Wrapper>
  );
}
