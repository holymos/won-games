import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { Empty } from ".";

const props = {
  title: "Your wishlist is empty",
  description: "A simple description"
};

describe("<Empty />", () => {
  it("should render component correctly", () => {
    const { container } = renderWithTheme(<Empty {...props} hasLink />);

    expect(
      screen.getByRole("img", {
        name: /a gamer in a couch playing videogame/i
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /your wishlist is empty/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/a simple description/i)).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /go back to store/i })
    ).toHaveAttribute("href", "/");

    expect(container.parentElement).toMatchSnapshot();
  });

  it("should not render link when hasLink prop is not passed", () => {
    renderWithTheme(<Empty {...props} />);

    expect(
      screen.queryByRole("link", { name: /go back to store/i })
    ).not.toBeInTheDocument();
  });
});
