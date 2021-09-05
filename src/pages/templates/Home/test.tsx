import "match-media-mock";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { items as bannersMock } from "components/BannerSlider/mock";
import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";

import { Home } from ".";

const props = {
  banners: bannersMock,
  newGames: [gamesMock[0]],
  mostPopularHighlight: highlightMock,
  mostPopularGames: [gamesMock[0]],
  upcomingGames: [gamesMock[0]],
  upcomingHighlight: highlightMock,
  upcomingMoreGames: [gamesMock[0]],
  freeGamesHighlight: highlightMock,
  freeGames: [gamesMock[0]]
};

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

describe("<Home />", () => {
  it("should render banner and showcases", () => {
    renderWithTheme(<Home {...props} />);

    expect(screen.getAllByTestId("Mock Showcase")).toHaveLength(5);
    expect(screen.getByTestId("Mock BannerSlider")).toBeInTheDocument();
  });
});
