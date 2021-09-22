import { CartContextDefaultValues } from "contexts/cartContext";
import { render, screen } from "utils/test-utils";

import { CartList } from ".";
import { cartListMock } from "./mock";

describe("<CartList />", () => {
  it("should render items and price", () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items: cartListMock,
      total: "$320.00"
    };
    const { container } = render(<CartList />, { cartProviderProps });

    expect(screen.getAllByRole("heading")).toHaveLength(2);
    expect(screen.getByText("$320.00")).toHaveStyle({
      color: "#F231A5"
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render the button", () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items: cartListMock
    };
    render(<CartList hasButton />, { cartProviderProps });

    expect(
      screen.getByRole("link", { name: /buy it now/i })
    ).toBeInTheDocument();
  });

  it("should render a loader", () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      loading: true
    };
    render(<CartList hasButton />, { cartProviderProps });

    expect(screen.getByTitle(/loading/i)).toBeInTheDocument();
  });

  it("should render empty component if there are no games", () => {
    render(<CartList />);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument();
  });
});
