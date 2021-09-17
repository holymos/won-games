import { QueryGames_games } from "graphql/generated/QueryGames";
import {
  QueryHome_banners,
  QueryHome_sections_newGames_highlight
} from "graphql/generated/QueryHome";
import { bannerMapper, gamesMapper, highlightMapper } from ".";

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
        price: 10
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
      backgroundImage: "http://localhost:1337/image.jpg",
      floatImage: "http://localhost:1337/image.jpg",
      buttonLabel: "button label",
      buttonLink: "button link",
      alignment: "right"
    });
  });
});
