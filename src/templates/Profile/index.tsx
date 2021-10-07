import { useRouter } from "next/router";
import { ReactNode } from "react";

import { Base } from "../Base";
import { Container } from "components/Container";
import { Heading } from "components/Heading";
import { ProfileMenu } from "components/ProfileMenu";

import * as S from "./styles";

export type ProfileTemplateProps = {
  children: ReactNode;
};

export function Profile({ children }: ProfileTemplateProps) {
  const { asPath } = useRouter();

  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My profile
        </Heading>

        <S.Main>
          <ProfileMenu activeLink={asPath} />

          <S.Content>{children}</S.Content>
        </S.Main>
      </Container>
    </Base>
  );
}
