import { ReactNode } from "react";
import { render, screen } from "utils/test-utils";

import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";

import { Cart } from ".";

jest.mock("templates/Base", () => {
  return {
    __esModule: true,
    Base: function Mock({ children }: { children: ReactNode }) {
      return <div data-testid="Mock Base">{children}</div>;
    }
  };
});

jest.mock("components/Showcase", () => {
  return {
    __esModule: true,
    Showcase: function Mock() {
      return <div data-testid="Mock Showcase"></div>;
    }
  };
});

jest.mock("components/CartList", () => {
  return {
    __esModule: true,
    CartList: function Mock() {
      return <div data-testid="Mock CartList"></div>;
    }
  };
});

jest.mock("components/PaymentForm", () => {
  return {
    __esModule: true,
    PaymentForm: function Mock() {
      return <div data-testid="Mock PaymentForm"></div>;
    }
  };
});

jest.mock("components/Empty", () => {
  return {
    __esModule: true,
    Empty: function Mock() {
      return <div data-testid="Mock Empty"></div>;
    }
  };
});

const props = {
  session: {
    jwt: "token",
    user: {
      email: "email@email.com"
    },
    expires: "1234"
  },
  recommendedTitle: "You may like these games",
  recommendedGames: gamesMock,
  recommendedHighlight: highlightMock
};

describe("<Cart />", () => {
  it("should render the sections", () => {
    render(<Cart {...props} />);

    expect(
      screen.getByRole("heading", { name: /my cart/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId("Mock CartList")).toBeInTheDocument();
    expect(screen.getByTestId("Mock PaymentForm")).toBeInTheDocument();
    expect(screen.getByTestId("Mock Showcase")).toBeInTheDocument();
    expect(screen.queryByTestId("Mock Empty")).not.toBeInTheDocument();
  });
});
