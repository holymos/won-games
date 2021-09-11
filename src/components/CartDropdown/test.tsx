import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { cartListMock } from "components/CartList/mock";

import { CartDropdown } from ".";

describe("<CartDropdown />", () => {
  it("should render cart icon and badge", () => {
    renderWithTheme(<CartDropdown items={cartListMock} total="R$ 300,00" />);

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
    expect(screen.getByText(`${cartListMock.length}`)).toBeInTheDocument();
  });

  it("should render dropdown content with cart items and total", () => {
    renderWithTheme(<CartDropdown items={cartListMock} total="R$ 300,00" />);

    expect(screen.getByText(/r\$ 300,00/i)).toBeInTheDocument();
    expect(screen.getByText(`${cartListMock[0].title}`)).toBeInTheDocument();
  });
});
