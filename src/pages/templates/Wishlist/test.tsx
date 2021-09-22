import { render, screen } from "utils/test-utils";

import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";

import { Wishlist } from ".";

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
    render(
      <Wishlist
        games={gamesMock}
        recommendedGames={gamesMock}
        recommendedHighlight={highlightMock}
      />
    );

    expect(screen.getByRole("heading", { name: /wishlist/i }));
    expect(screen.getAllByText(/population zero/i)).toHaveLength(6);
    expect(screen.getByTestId("Mock Showcase")).toBeInTheDocument();
  });

  it("should render empty component when there are no games", () => {
    render(
      <Wishlist
        recommendedGames={gamesMock}
        recommendedHighlight={highlightMock}
      />
    );

    expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /your wishlist is empty/i })
    ).toBeInTheDocument();
  });
});
