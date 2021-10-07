import { fireEvent, render, screen } from "utils/test-utils";

import { Menu } from ".";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({
  push: jest.fn()
}));

describe("<Menu />", () => {
  it("should render the menu", () => {
    render(<Menu />);

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/shopping cart/i)).toHaveLength(2);
    expect(screen.getByRole("img", { name: /won games/i })).toBeInTheDocument();
  });

  it("should handle open/close menu", () => {
    render(<Menu />);

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
    render(<Menu />);

    expect(screen.getByText(/login now/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it("should show wishlist and profile links when logged in", () => {
    render(<Menu username="moses" />);

    expect(screen.queryByText(/login now/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/wishlist/i)).toHaveLength(2);
    expect(screen.getByText(/my profile/i)).toBeInTheDocument();
  });

  it("should not show sign in or dropdown user if loading", () => {
    render(<Menu username="moses" loading />);

    expect(screen.queryByText(/my profile/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });
});
