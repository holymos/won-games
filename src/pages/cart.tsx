import { cartListMock } from "components/CartList/mock";
import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";
import { paymentOptionsMock } from "components/PaymentOptions/mock";
import { Cart, CartTemplateProps } from "./templates/Cart";

export default function CartPage(props: CartTemplateProps) {
  return <Cart {...props} />;
}

export async function getServerSideProps() {
  return {
    props: {
      recommendedGames: gamesMock,
      recommendedHighlight: highlightMock,
      items: cartListMock,
      total: "R$ 330,00",
      cards: paymentOptionsMock
    }
  };
}
