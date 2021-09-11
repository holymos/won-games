import { fireEvent, screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { Menu } from ".";

describe("<Menu />", () => {
  it("should render the menu", () => {
    renderWithTheme(<Menu />);

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/shopping cart/i)).toHaveLength(2);
    expect(screen.getByRole("img", { name: /won games/i })).toBeInTheDocument();
  });

  it("should handle open/close menu", () => {
    renderWithTheme(<Menu />);

    const fullMenuElement = screen.getByRole("navigation", { hidden: true });

    expect(fullMenuElement.getAttribute("aria-hidden")).toBe("true");
    expect(fullMenuElement).toHaveStyle({ opacity: 0 });

    fireEvent.click(screen.getByLabelText(/open menu/i));

    expect(fullMenuElement.getAttribute("aria-hidden")).toBe("false");
    expect(fullMenuElement).toHaveStyle({ opacity: 1 });

    fireEvent.click(screen.getByLabelText(/close menu/i));

    expect(fullMenuElement.getAttribute("aria-hidden")).toBe("true");
    expect(fullMenuElement).toHaveStyle({ opacity: 0 });
  });

  it("should show register box when logged out", () => {
    renderWithTheme(<Menu />);

    expect(screen.getByText(/login now/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it("should show wishlist and profile links when logged in", () => {
    renderWithTheme(<Menu username="moses" />);

    expect(screen.queryByText(/login now/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/wishlist/i)).toHaveLength(2);
    expect(screen.getByText(/my profile/i)).toBeInTheDocument();
  });
});
