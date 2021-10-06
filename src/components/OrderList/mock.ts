import { OrderProps } from ".";

export const orderListMock: OrderProps[] = [
  {
    id: "1",
    paymentInfo: {
      flag: "visa",
      img: "/img/cards/visa.png",
      cardNumber: "**** **** **** 4242",
      purchaseDate: "Purchase made on Apr 14, 2021"
    },
    games: [
      {
        id: "1",
        slug: "game",
        title: "game",
        downloadLink:
          "https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf",
        img: "http://localhost:1337/image.jpg",
        price: "$10.00"
      }
    ]
  },
  {
    id: "2",
    paymentInfo: {
      flag: "visa",
      img: "/img/cards/mastercard.png",
      cardNumber: "**** **** **** 4444",
      purchaseDate: "Purchase made on Apr 14, 2021"
    },
    games: [
      {
        id: "2",
        title: "game",
        slug: "game",
        downloadLink:
          "https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf",
        img: "http://localhost:1337/image.jpg",
        price: "$10.00"
      }
    ]
  }
];
