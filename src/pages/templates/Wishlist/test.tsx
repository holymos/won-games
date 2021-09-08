import { screen } from "@testing-library/react";
import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";
import { renderWithTheme } from "utils/tests/helpers";

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
    renderWithTheme(
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
    renderWithTheme(
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
