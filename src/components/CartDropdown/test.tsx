import { render, screen } from "utils/test-utils";

import { cartListMock } from "components/CartList/mock";

import { CartDropdown } from ".";
import { CartContextDefaultValues } from "contexts/cartContext";

describe("<CartDropdown />", () => {
  beforeEach(() => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items: cartListMock,
      quantity: cartListMock.length,
      total: "$300.00"
    };

    render(<CartDropdown />, { cartProviderProps });
  });

  it("should render cart icon and badge", () => {
    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
    expect(screen.getByText(`${cartListMock.length}`)).toBeInTheDocument();
  });

  it("should render dropdown content with cart items and total", () => {
    expect(screen.getByText(/\$300.00/i)).toBeInTheDocument();
    expect(screen.getByText(`${cartListMock[0].title}`)).toBeInTheDocument();
  });
});
