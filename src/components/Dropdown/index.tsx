import { ReactNode, useState } from "react";

import * as S from "./styles";

export type DropdownProps = {
  title: ReactNode;
  children: ReactNode;
};

export function Dropdown({ title, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.Wrapper isOpen={isOpen}>
      <S.Title onClick={() => setIsOpen(!isOpen)}>{title}</S.Title>

      <S.Content aria-hidden={!isOpen}>{children}</S.Content>
    </S.Wrapper>
  );
}
