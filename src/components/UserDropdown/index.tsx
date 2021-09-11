import Link from "next/link";
import {
  AccountCircle,
  ExitToApp,
  FavoriteBorder
} from "@styled-icons/material-outlined";
import { ChevronDown } from "@styled-icons/boxicons-regular";

import { Dropdown } from "components/Dropdown";
import * as S from "./styles";

export type UserDropdownProps = {
  username: string;
};

export function UserDropdown({ username }: UserDropdownProps) {
  return (
    <Dropdown
      title={
        <S.Title>
          <AccountCircle size={24} />
          {username}
          <ChevronDown size={24} />
        </S.Title>
      }
    >
      <S.Nav>
        <Link href="/profile/me" passHref>
          <S.Link title="My profile">
            <AccountCircle />
            <span>My profile</span>
          </S.Link>
        </Link>

        <Link href="/wishlist" passHref>
          <S.Link title="Wishlist">
            <FavoriteBorder />
            <span>Wishlist</span>
          </S.Link>
        </Link>

        <Link href="/sign-out" passHref>
          <S.Link title="Sign out">
            <ExitToApp />
            <span>Sign out</span>
          </S.Link>
        </Link>
      </S.Nav>
    </Dropdown>
  );
}
