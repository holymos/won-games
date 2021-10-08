import Image from "next/image";
import Link from "next/link";
import { Trash } from "@styled-icons/boxicons-regular";
import { Download } from "@styled-icons/boxicons-solid/Download";
import { useCart } from "hooks/useCart";

import * as S from "./styles";

export type PaymentInfoProps = {
  cardNumber: string;
  flag: string | null;
  img: string | null;
  purchaseDate: string;
};

export type GameItemProps = {
  id: string;
  slug: string;
  img: string | null;
  title: string;
  price: string;
  downloadLink?: string;
  paymentInfo?: PaymentInfoProps;
};

export function GameItem({
  id,
  slug,
  img,
  title,
  price,
  downloadLink,
  paymentInfo
}: GameItemProps) {
  const { isInCart, removeFromCart } = useCart();

  return (
    <S.Wrapper>
      <S.GameContent>
        {img && (
          <S.ImageBox>
            <Image src={img} alt={title} width={150} height={70} />
          </S.ImageBox>
        )}

        <S.Content>
          <Link href={`/game/${slug}`} passHref>
            <S.Title>
              {title}
              {!!downloadLink && (
                <S.DownloadLink
                  href={downloadLink}
                  target="_blank"
                  aria-label={`Get ${title} here`}
                >
                  <Download size={22} />
                </S.DownloadLink>
              )}
            </S.Title>
          </Link>

          <S.Group>
            <S.Price>{price}</S.Price>

            {isInCart(id) && (
              <S.Remove onClick={() => removeFromCart(id)}>
                <Trash aria-label="Remove from cart" />
              </S.Remove>
            )}
          </S.Group>
        </S.Content>
      </S.GameContent>

      {!!paymentInfo && (
        <S.PaymentContent>
          <span>{paymentInfo.purchaseDate}</span>

          <S.CardInfo>
            <span>{paymentInfo.cardNumber}</span>
            {!!paymentInfo.img && !!paymentInfo.flag && (
              <Image
                src={paymentInfo.img}
                alt={paymentInfo.flag}
                width={38}
                height={24}
              />
            )}
          </S.CardInfo>
        </S.PaymentContent>
      )}
    </S.Wrapper>
  );
}
