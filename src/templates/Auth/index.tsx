import Link from "next/link";
import { Heading } from "components/Heading";
import { Logo } from "components/Logo";
import { ReactNode } from "react";

import * as S from "./styles";

type Authprops = {
  title: string;
  children: ReactNode;
};

export function Auth({ title, children }: Authprops) {
  return (
    <S.Wrapper>
      <S.BannerBlock>
        <S.BannerContent>
          <Link href="/">
            <a>
              <Logo id="banner" />
            </a>
          </Link>

          <div>
            <Heading size="huge">All your favorite games in one place</Heading>
            <S.Subtitle>
              <strong>WON</strong> is the best and most complete gaming
              platform.
            </S.Subtitle>
          </div>

          <S.Footer>Won Games 2020 © Todos os Direitos Reservados.</S.Footer>
        </S.BannerContent>
      </S.BannerBlock>

      <S.Content>
        <S.ContentWrapper>
          <Link href="/">
            <a>
              <Logo color="black" size="large" id="content" />
            </a>
          </Link>

          <Heading color="black" lineLeft lineColor="secondary">
            {title}
          </Heading>

          {children}
        </S.ContentWrapper>
      </S.Content>
    </S.Wrapper>
  );
}
