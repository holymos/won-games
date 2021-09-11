import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { CartList } from ".";
import { cartListMock } from "./mock";

describe("<CartList />", () => {
  it("should render items and price", () => {
    const { container } = renderWithTheme(
      <CartList items={cartListMock} total="R$ 330,00" />
    );

    expect(screen.getAllByRole("heading")).toHaveLength(2);
    expect(screen.getByText("R$ 330,00")).toHaveStyle({
      color: "#F231A5"
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render the button", () => {
    renderWithTheme(
      <CartList items={cartListMock} total="R$ 330,00" hasButton />
    );

    expect(
      screen.getByRole("link", { name: /buy it now/i })
    ).toBeInTheDocument();
  });

  it("should render empty component if there are no games", () => {
    renderWithTheme(<CartList />);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument();
  });
});
