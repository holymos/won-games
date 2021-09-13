import "match-media-mock";
import { screen } from "@testing-library/react";

import { renderWithTheme } from "utils/tests/helpers";
import { GameCardSlider } from ".";
import { gamesMock } from "./mock";

describe("<GameCardSlider />", () => {
  it("should render with 4 active items", () => {
    const { container } = renderWithTheme(<GameCardSlider items={gamesMock} />);

    expect(container.querySelectorAll(".slick-active")).toHaveLength(4);
  });

  it("should render white arrows if color prop is passed", () => {
    renderWithTheme(<GameCardSlider items={gamesMock} color="white" />);

    expect(screen.getByLabelText(/next game/i)).toHaveStyle({
      color: "#FAFAFA"
    });

    expect(screen.getByLabelText(/previous game/i)).toHaveStyle({
      color: "#FAFAFA"
    });
  });
});
