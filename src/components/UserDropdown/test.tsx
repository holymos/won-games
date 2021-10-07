import { render, screen } from "utils/test-utils";
import userEvent from "@testing-library/user-event";

import { UserDropdown } from ".";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({
  push: jest.fn()
}));

describe("<UserDropdown />", () => {
  it("should render the username", () => {
    render(<UserDropdown username="test" />);

    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it("should render the menu", () => {
    render(<UserDropdown username="test" />);

    userEvent.click(screen.getByText(/test/i));

    expect(
      screen.getByRole("link", { name: /my profile/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /wishlist/i })).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /sign out/i })
    ).toBeInTheDocument();
  });
});
