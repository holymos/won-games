import "session.mock";
import { render, screen } from "utils/test-utils";

import { galleryMock } from "components/Gallery/mock";
import { gameInfoMock } from "components/GameInfo/mock";
import { gameDetailsMock } from "components/GameDetails/mock";
import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";

import { Game, GameTemplateProps } from ".";

const props: GameTemplateProps = {
  slug: "game",
  recommendedTitle: "You may like these games",
  cover: "bg-image.jpg",
  gameInfo: gameInfoMock,
  gallery: galleryMock,
  description: "<h1>Custom Html</h1>",
  details: gameDetailsMock,
  upcomingTitle: "Upcoming",
  upcomingGames: gamesMock,
  upcomingHighlight: highlightMock,
  recommendedGames: gamesMock
};

jest.mock("components/Menu", () => {
  return {
    __esModule: true,
    Menu: function Mock() {
      return <div data-testid="Mock Menu"></div>;
    }
  };
});

jest.mock("components/Gallery", () => {
  return {
    __esModule: true,
    Gallery: function Mock() {
      return <div data-testid="Mock Gallery"></div>;
    }
  };
});

jest.mock("components/GameDetails", () => {
  return {
    __esModule: true,
    GameDetails: function Mock() {
      return <div data-testid="Mock GameDetails"></div>;
    }
  };
});

jest.mock("components/GameInfo", () => {
  return {
    __esModule: true,
    GameInfo: function Mock() {
      return <div data-testid="Mock GameInfo"></div>;
    }
  };
});

jest.mock("components/Showcase", () => {
  return {
    __esModule: true,
    Showcase: function Mock() {
      return <div data-testid="Mock Showcase"></div>;
    }
  };
});

jest.mock("components/BannerSlider", () => {
  return {
    __esModule: true,
    BannerSlider: function Mock() {
      return <div data-testid="Mock BannerSlider"></div>;
    }
  };
});

describe("<Game />", () => {
  it("should render the template with components", () => {
    render(<Game {...props} />);

    expect(screen.getByTestId("Mock Gallery")).toBeInTheDocument();
    expect(screen.getByTestId("Mock GameDetails")).toBeInTheDocument();
    expect(screen.getByTestId("Mock GameInfo")).toBeInTheDocument();
    expect(screen.getByText(/ustom html/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("Mock Showcase")).toHaveLength(2);
  });

  it("should not render gallery with components", () => {
    render(<Game {...props} gallery={undefined} />);

    expect(screen.queryByTestId("Mock Gallery")).not.toBeInTheDocument();
  });

  it("should not render gallery on mobile", () => {
    render(<Game {...props} />);

    expect(screen.getByTestId("Mock Gallery").parentElement).toHaveStyle({
      display: "none"
    });

    expect(screen.getByTestId("Mock Gallery").parentElement).toHaveStyleRule(
      "display",
      "block",
      { media: "(min-width: 768px)" }
    );
  });

  it("should render a cover image", () => {
    render(<Game {...props} />);

    const cover = screen.getByRole("img", { name: gameInfoMock.title });

    expect(cover.parentElement).toHaveStyle({
      height: "39.5rem"
    });

    expect(cover.parentElement).toHaveStyleRule("height", "70rem", {
      media: "(min-width: 768px)"
    });

    expect(cover.parentElement).toHaveStyleRule(
      "clip-path",
      "polygon(0 0,100% 0,100% 100%,0 85%)",
      {
        media: "(min-width: 768px)"
      }
    );
  });
});
