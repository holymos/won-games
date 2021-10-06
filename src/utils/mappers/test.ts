import { QueryGames_games } from "graphql/generated/QueryGames";
import {
  QueryHome_banners,
  QueryHome_sections_newGames_highlight
} from "graphql/generated/QueryHome";
import { QueryOrders_orders } from "graphql/generated/QueryOrders";
import {
  bannerMapper,
  cartMapper,
  gamesMapper,
  highlightMapper,
  ordersMapper
} from ".";

describe("bannerMapper", () => {
  it("should return the righ format when mapped", () => {
    const banner = {
      image: {
        url: "/image.jpg"
      },
      title: "Banner title",
      subtitle: "Banner subtitle",
      button: {
        label: "Button label",
        link: "Button link"
      },
      ribbon: {
        text: "Ribbon text",
        color: "primary",
        size: "small"
      }
    } as QueryHome_banners;

    expect(bannerMapper([banner])).toStrictEqual([
      {
        img: "http://localhost:1337/image.jpg",
        title: "Banner title",
        subtitle: "Banner subtitle",
        buttonLabel: "Button label",
        buttonLink: "Button link",
        ribbon: "Ribbon text",
        ribbonColor: "primary",
        ribbonSize: "small"
      }
    ]);
  });
});

describe("gamesMapper", () => {
  it("should return an empty array if there are no games", () => {
    expect(gamesMapper(null)).toStrictEqual([]);
  });

  it("should return the correct format when mapped", () => {
    const game = {
      id: "1",
      name: "game",
      developers: [
        {
          name: "developer"
        }
      ],
      slug: "game",
      cover: {
        url: "/image.jpg"
      },
      price: 10
    } as QueryGames_games;

    expect(gamesMapper([game])).toStrictEqual([
      {
        id: "1",
        title: "game",
        slug: "game",
        developer: "developer",
        img: "http://localhost:1337/image.jpg",
        price: "$10.00"
      }
    ]);
  });
});

describe("highlightMapper", () => {
  it("should return an empty object if there's no highlight", () => {
    expect(gamesMapper(null)).toStrictEqual([]);
  });

  it("should return the correct format when mapped", () => {
    const highlight = {
      title: "title",
      subtitle: "subtitle",
      background: {
        url: "/image.jpg"
      },
      buttonLabel: "button label",
      buttonLink: "button link",
      alignment: "right",
      floatImage: {
        url: "/image.jpg"
      }
    } as QueryHome_sections_newGames_highlight;

    expect(highlightMapper(highlight)).toStrictEqual({
      title: "title",
      subtitle: "subtitle",
      backgroundImg: "http://localhost:1337/image.jpg",
      floatImg: "http://localhost:1337/image.jpg",
      buttonLabel: "button label",
      buttonLink: "button link",
      alignment: "right"
    });
  });
});

describe("cartMapper", () => {
  it("should return an empty array if there are no games", () => {
    expect(cartMapper(null)).toStrictEqual([]);
  });

  it("should return the correct format when mapped", () => {
    const game = {
      id: "1",
      name: "game",
      developers: [
        {
          name: "developer"
        }
      ],
      slug: "game",
      cover: {
        url: "/image.jpg"
      },
      price: 10
    } as QueryGames_games;

    expect(cartMapper([game])).toStrictEqual([
      {
        id: "1",
        title: "game",
        img: "http://localhost:1337/image.jpg",
        price: "$10.00",
        slug: "game"
      }
    ]);
  });
});

describe("ordersMapper", () => {
  it("should return an empty array if there are no orders", () => {
    expect(cartMapper(null)).toStrictEqual([]);
  });

  it("should return mapped items", () => {
    const orders = [
      {
        __typename: "Order",
        id: "1",
        card_brand: "visa",
        card_last4: "4242",
        created_at: "2021-04-14T18:41:48.358Z",
        games: [
          {
            id: "1",
            name: "game",
            developers: [
              {
                name: "developer"
              }
            ],
            slug: "game",
            cover: {
              url: "/image.jpg"
            },
            price: 10
          }
        ]
      }
    ] as QueryOrders_orders[];

    expect(ordersMapper(orders)).toStrictEqual([
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
            title: "game",
            downloadLink:
              "https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf",
            img: "http://localhost:1337/image.jpg",
            price: "$10.00"
          }
        ]
      }
    ]);
  });

  it("should return free game when free", () => {
    const orders = [
      {
        __typename: "Order",
        id: "1",
        card_brand: null,
        card_last4: null,
        created_at: "2021-04-14T18:41:48.358Z",
        games: [
          {
            id: "1",
            name: "game",
            developers: [
              {
                name: "developer"
              }
            ],
            slug: "game",
            cover: {
              url: "/image.jpg"
            },
            price: 0
          }
        ]
      }
    ] as QueryOrders_orders[];

    expect(ordersMapper(orders)).toStrictEqual([
      {
        id: "1",
        paymentInfo: {
          flag: null,
          img: null,
          cardNumber: "Free game",
          purchaseDate: "Purchase made on Apr 14, 2021"
        },
        games: [
          {
            id: "1",
            title: "game",
            downloadLink:
              "https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf",
            img: "http://localhost:1337/image.jpg",
            price: "$0.00"
          }
        ]
      }
    ]);
  });
});
