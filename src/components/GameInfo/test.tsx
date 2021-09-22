import { render, screen } from "utils/test-utils";

import { GameInfo } from ".";
import { gameInfoMock } from "./mock";

describe("<GameInfo />", () => {
  it("should render game info", () => {
    const { container } = render(<GameInfo {...gameInfoMock} />);

    expect(
      screen.getByRole("heading", { name: /borderlands 3/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/\$215.00/)).toBeInTheDocument();

    expect(
      screen.getByText(/Experience the epic space strategy/i)
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render buttons", () => {
    render(<GameInfo {...gameInfoMock} />);

    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /wishlist/i })
    ).toBeInTheDocument();
  });
});
