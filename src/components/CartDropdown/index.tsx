import { CartIcon } from "components/CartIcon";
import { CartList } from "components/CartList";
import { Dropdown } from "components/Dropdown";

import * as S from "./styles";

export function CartDropdown() {
  return (
    <S.Wrapper>
      <Dropdown title={<CartIcon />}>
        <CartList hasButton />
      </Dropdown>
    </S.Wrapper>
  );
}
