import { ReactNode } from "react";
import { render, screen } from "utils/test-utils";

import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";
import { paymentOptionsMock } from "components/PaymentOptions/mock";

import { Cart } from ".";

jest.mock("pages/templates/Base", () => {
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

jest.mock("components/PaymentOptions", () => {
  return {
    __esModule: true,
    PaymentOptions: function Mock() {
      return <div data-testid="Mock PaymentOptions"></div>;
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
  recommendedTitle: "You may like these games",
  recommendedGames: gamesMock,
  recommendedHighlight: highlightMock,
  cards: paymentOptionsMock
};

describe("<Cart />", () => {
  it("should render the sections", () => {
    render(<Cart {...props} />);

    expect(
      screen.getByRole("heading", { name: /my cart/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId("Mock CartList")).toBeInTheDocument();
    expect(screen.getByTestId("Mock PaymentOptions")).toBeInTheDocument();
    expect(screen.getByTestId("Mock Showcase")).toBeInTheDocument();
    expect(screen.queryByTestId("Mock Empty")).not.toBeInTheDocument();
  });
});
