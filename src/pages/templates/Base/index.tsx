import { ReactNode } from "react";

import { Container } from "components/Container";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import * as S from "./styles";

export type BaseProps = {
  children: ReactNode;
};

export function Base({ children }: BaseProps) {
  return (
    <section>
      <Container>
        <Menu />
      </Container>

      {children}

      <S.SectionFooter>
        <Container>
          <Footer />
        </Container>
      </S.SectionFooter>
    </section>
  );
}
