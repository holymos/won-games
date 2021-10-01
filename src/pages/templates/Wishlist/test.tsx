import "session.mock";
import { render, screen } from "utils/test-utils";

import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";

import { Wishlist } from ".";
import { WishlistContextDefaultValues } from "contexts/wishlistContext";

jest.mock("components/Showcase", () => {
  return {
    __esModule: true,
    Showcase: function Mock() {
      return <div data-testid="Mock Showcase"></div>;
    }
  };
});

describe("<Wishlist />", () => {
  it("should render correctly", () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      items: [gamesMock[0]]
    };

    render(
      <Wishlist
        recommendedGames={gamesMock}
        recommendedHighlight={highlightMock}
      />,
      { wishlistProviderProps }
    );

    expect(screen.getByRole("heading", { name: /wishlist/i }));
    expect(screen.getByText(/population zero/i)).toBeInTheDocument();
    expect(screen.getByTestId("Mock Showcase")).toBeInTheDocument();
  });

  it("should render empty component when there are no games", () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      items: []
    };

    render(
      <Wishlist
        recommendedGames={gamesMock}
        recommendedHighlight={highlightMock}
      />,
      { wishlistProviderProps }
    );

    expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /your wishlist is empty/i })
    ).toBeInTheDocument();
  });
});
