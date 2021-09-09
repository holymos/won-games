import * as S from "./styles";
import { Download } from "@styled-icons/boxicons-solid/Download";

export type PaymentInfoProps = {
  cardNumber: string;
  flag: string;
  image: string;
  purchaseDate: string;
};

export type GameItemProps = {
  image: string;
  title: string;
  price: string;
  downloadLink?: string;
  paymentInfo?: PaymentInfoProps;
};

export function GameItem({
  image,
  title,
  price,
  downloadLink,
  paymentInfo
}: GameItemProps) {
  return (
    <S.Wrapper>
      <S.GameContent>
        <S.ImageBox>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={title} />
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
          <S.Price>{price}</S.Price>
        </S.Content>
      </S.GameContent>

      {!!paymentInfo && (
        <S.PaymentContent>
          <span>{paymentInfo.purchaseDate}</span>

          <S.CardInfo>
            <span>{paymentInfo.cardNumber}</span>
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img src={paymentInfo.image} alt={paymentInfo.flag} />
            }
          </S.CardInfo>
        </S.PaymentContent>
      )}
    </S.Wrapper>
  );
}
