import "session.mock";
import "match-media-mock";
import { render, screen } from "utils/test-utils";

import { items as bannersMock } from "components/BannerSlider/mock";
import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";

import { Home } from ".";

const props = {
  banners: bannersMock,
  newGamesTitle: "New games",
  newGames: [gamesMock[0]],
  mostPopularGamesTitle: "Most popular",
  mostPopularHighlight: highlightMock,
  mostPopularGames: [gamesMock[0]],
  upcomingGamesTitle: "Upcoming games",
  upcomingGames: [gamesMock[0]],
  upcomingHighlight: highlightMock,
  freeGamesTitle: "Free games",
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
    render(<Home {...props} />);

    expect(screen.getAllByTestId("Mock Showcase")).toHaveLength(4);
    expect(screen.getByTestId("Mock BannerSlider")).toBeInTheDocument();
  });
});
