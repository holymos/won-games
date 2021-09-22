import { GameItemProps } from "components/GameItem";

export const orderListMock: GameItemProps[] = [
  {
    id: "1",
    slug: "red-dead-redemption-2",
    img: "https://source.unsplash.com/user/willianjusten/151x70",
    title: "Red Dead Redemption 2",
    price: "$215.00",
    downloadLink: "https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf",
    paymentInfo: {
      flag: "mastercard",
      img: "/img/cards/mastercard.png",
      cardNumber: "*** *** **** 4326",
      purchaseDate: "Purchase made on 07/20/2020 at 20:32"
    }
  },
  {
    id: "2",
    slug: "red-dead-redemption-2",
    img: "https://source.unsplash.com/user/willianjusten/151x70",
    title: "Red Dead Redemption 2",
    price: "$215.00",
    downloadLink: "https://wongames.com/game/download/kjhejl867asd76DEh",
    paymentInfo: {
      flag: "visa",
      img: "/img/cards/visa.png",
      cardNumber: "*** *** **** 5423",
      purchaseDate: "Purchase made on 08/20/2020 at 21:12"
    }
  }
];
