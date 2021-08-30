import "match-media-mock";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { items as bannersMock } from "components/BannerSlider/mock";
import { items as gamesMock } from "components/GameCardSlider/mock";
import { item as highlightMock } from "components/Highlight/mock";

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

describe("<Home />", () => {
  it("should render menu and footer", () => {
    renderWithTheme(<Home {...props} />);

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /contact us/i })
    ).toBeInTheDocument();

    expect(screen.getAllByRole("img", { name: /won games/i })).toHaveLength(2);
  });

  it("should render the sections", () => {
    renderWithTheme(<Home {...props} />);

    expect(screen.getByRole("heading", { name: /news/i })).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /most popular/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /upcoming/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /free games/i })
    ).toBeInTheDocument();
  });

  it("should render sections elements", () => {
    renderWithTheme(<Home {...props} />);

    // banner
    expect(screen.getAllByText(/defy death 1/i)).toHaveLength(1);

    // card game (5 sections com 1 card cada)
    expect(screen.getAllByText(/population zero/i)).toHaveLength(5);

    // highlight
    expect(screen.getAllByText(/red dead is back/i)).toHaveLength(3);
  });
});
