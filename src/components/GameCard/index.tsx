import Link from "next/link";

import { Ribbon, RibbonColors, RibbonSizes } from "components/Ribbon";

import * as S from "./styles";
import { currencyToNumber } from "utils/formatPrice";
import { CartButton } from "components/CartButton";
import { WishlistButton } from "components/WishlistButton";

export type GameCardProps = {
  id: string;
  slug: string;
  title: string;
  developer: string;
  img: string;
  price: string;
  promotionalPrice?: string;
  ribbon?: React.ReactNode;
  ribbonColor?: RibbonColors;
  ribbonSize?: RibbonSizes;
};

export function GameCard({
  id,
  slug,
  title,
  developer,
  img,
  price,
  promotionalPrice,
  ribbon,
  ribbonColor = "primary",
  ribbonSize = "small"
}: GameCardProps) {
  return (
    <S.Wrapper>
      {!!ribbon && (
        <Ribbon color={ribbonColor} size={ribbonSize}>
          {ribbon}
        </Ribbon>
      )}

      <Link href={`/game/${slug}`} passHref>
        <S.ImageBox>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={title} />
          }
        </S.ImageBox>
      </Link>

      <S.Content>
        <Link href={`/game/${slug}`} passHref>
          <S.Info>
            <S.Title>{title}</S.Title>
            <S.Developer>{developer}</S.Developer>
          </S.Info>
        </Link>

        <S.FavButton>
          <WishlistButton id={id} />
        </S.FavButton>

        <S.BuyBox>
          {!!promotionalPrice && <S.Price isPromotional>{price}</S.Price>}
          <S.Price>
            {currencyToNumber(price) > 0 ? promotionalPrice || price : "Free"}
          </S.Price>

          <CartButton id={id} />
        </S.BuyBox>
      </S.Content>
    </S.Wrapper>
  );
}
