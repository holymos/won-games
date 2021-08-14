import { Heading } from "components/Heading";
import { Logo } from "components/Logo";
import Link from "next/link";
import * as S from "./styles";

export function Footer() {
  return (
    <S.Wrapper>
      <Logo color="black" />

      <S.Content>
        <S.Column>
          <Heading color="black" size="small" lineBottom lineColor="secondary">
            Contact
          </Heading>

          <a href="mailto:sac@wongames.com">sac@wongames.com</a>
          <a href="tel:+552133283719">+55 21 33283719</a>
        </S.Column>

        <S.Column>
          <Heading color="black" size="small" lineBottom lineColor="secondary">
            Follow us
          </Heading>

          <nav aria-labelledby="social media">
            <a
              href="https://www.instagram.com/wongames"
              target="_"
              rel="noopenner, noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.twitter.com/wongames"
              target="_"
              rel="noopenner, noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://www.youtube.com/wongames"
              target="_"
              rel="noopenner, noreferrer"
            >
              Youtube
            </a>
            <a
              href="https://www.facebook.com/wongames"
              target="_"
              rel="noopenner, noreferrer"
            >
              Facebook
            </a>
          </nav>
        </S.Column>

        <S.Column>
          <Heading color="black" size="small" lineBottom lineColor="secondary">
            Links
          </Heading>

          <nav aria-labelledby="footer resources">
            <Link href="/">
              <a>Home</a>
            </Link>

            <Link href="/">
              <a>Store</a>
            </Link>

            <Link href="/">
              <a>Buscar</a>
            </Link>
          </nav>
        </S.Column>

        <S.Column aria-labelledby="footer contact">
          <Heading color="black" size="small" lineBottom lineColor="secondary">
            Location
          </Heading>

          <span>Lorem ipsum sit</span>
          <span>Lorem Ipsum</span>
          <span>Lorem, ipsum dolor.</span>
        </S.Column>
      </S.Content>

      <S.Copyright>Won Games 2021 © All rights reserved.</S.Copyright>
    </S.Wrapper>
  );
}
