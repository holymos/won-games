import { Trash } from "@styled-icons/boxicons-regular";
import { Download } from "@styled-icons/boxicons-solid/Download";
import { useCart } from "hooks/useCart";

import * as S from "./styles";

export type PaymentInfoProps = {
  cardNumber: string;
  flag: string;
  img: string;
  purchaseDate: string;
};

export type GameItemProps = {
  id: string;
  slug: string;
  img: string;
  title: string;
  price: string;
  downloadLink?: string;
  paymentInfo?: PaymentInfoProps;
};

export function GameItem({
  id,
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
        <S.ImageBox>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={title} />
          }
        </S.ImageBox>

        <S.Content>
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
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img src={paymentInfo.img} alt={paymentInfo.flag} />
            }
          </S.CardInfo>
        </S.PaymentContent>
      )}
    </S.Wrapper>
  );
}
