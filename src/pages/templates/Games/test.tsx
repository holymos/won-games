import { screen } from "@testing-library/react";
import { exploreSidebarMock } from "components/ExploreSidebar/mock";
import { gamesMock } from "components/GameCardSlider/mock";
import { renderWithTheme } from "utils/tests/helpers";

import { Games } from ".";

jest.mock("pages/templates/Base", () => ({
  __esModule: true,
  Base: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  }
}));

jest.mock("components/ExploreSidebar", () => {
  return {
    __esModule: true,
    ExploreSidebar: function Mock() {
      return <div data-testid="Mock ExploreSidebar"></div>;
    }
  };
});

jest.mock("components/GameCard", () => {
  return {
    __esModule: true,
    GameCard: function Mock() {
      return <div data-testid="Mock GameCard"></div>;
    }
  };
});

describe("<Games />", () => {
  it("should render sections", () => {
    renderWithTheme(
      <Games filterItems={exploreSidebarMock} games={[gamesMock[0]]} />
    );

    expect(screen.getByTestId("Mock Base")).toBeInTheDocument();
    expect(screen.getByTestId("Mock ExploreSidebar")).toBeInTheDocument();
    expect(screen.getByTestId("Mock GameCard")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /show more/i })
    ).toBeInTheDocument();
  });
});
