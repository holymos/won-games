import { ReactNode } from "react";

import { Container } from "components/Container";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import * as S from "./styles";
import { useSession } from "next-auth/client";

export type BaseProps = {
  children: ReactNode;
};

export function Base({ children }: BaseProps) {
  const [session, loading] = useSession();

  return (
    <S.Wrapper>
      <Container>
        <Menu username={session?.user?.name} loading={loading} />
      </Container>

      <S.Content>{children}</S.Content>

      <S.SectionFooter>
        <Container>
          <Footer />
        </Container>
      </S.SectionFooter>
    </S.Wrapper>
  );
}
