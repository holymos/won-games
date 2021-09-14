import Link from "next/link";

import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder
} from "@styled-icons/material-outlined";

import { Ribbon, RibbonColors, RibbonSizes } from "components/Ribbon";
import { Button } from "components/Button";
import * as S from "./styles";
import { formatPrice } from "utils/formatPrice";

export type GameCardProps = {
  slug: string;
  title: string;
  developer: string;
  img: string;
  price: number;
  promotionalPrice?: number;
  favorite?: boolean;
  ribbon?: React.ReactNode;
  ribbonColor?: RibbonColors;
  ribbonSize?: RibbonSizes;
  onFav?: () => void;
};

export function GameCard({
  slug,
  title,
  developer,
  img,
  price,
  promotionalPrice,
  favorite = false,
  ribbon,
  ribbonColor = "primary",
  ribbonSize = "small",
  onFav
}: GameCardProps) {
  return (
    <S.Wrapper>
      {!!ribbon && (
        <Ribbon color={ribbonColor} size={ribbonSize}>
          {ribbon}
        </Ribbon>
      )}

      <Link href={`game/${slug}`} passHref>
        <S.ImageBox>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={title} />
          }
        </S.ImageBox>
      </Link>

      <S.Content>
        <Link href={`game/${slug}`} passHref>
          <S.Info>
            <S.Title>{title}</S.Title>
            <S.Developer>{developer}</S.Developer>
          </S.Info>
        </Link>

        <S.FavButton onClick={onFav} role="button">
          {favorite ? (
            <Favorite aria-label="Remove from Wishlist" />
          ) : (
            <FavoriteBorder aria-label="Add to Wishlist" />
          )}
        </S.FavButton>

        <S.BuyBox>
          {!!promotionalPrice && (
            <S.Price isPromotional>{formatPrice(price)}</S.Price>
          )}
          <S.Price>
            {price > 0 ? formatPrice(promotionalPrice || price) : "Free"}
          </S.Price>
          <Button icon={<AddShoppingCart />} size="small" />
        </S.BuyBox>
      </S.Content>
    </S.Wrapper>
  );
}
