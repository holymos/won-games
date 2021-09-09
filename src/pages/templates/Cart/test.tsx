import { screen } from "@testing-library/react";
import { cartListMock } from "components/CartList/mock";
import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";
import { paymentOptionsMock } from "components/PaymentOptions/mock";
import { ReactNode } from "react";
import { renderWithTheme } from "utils/tests/helpers";

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
  recommendedGames: gamesMock,
  recommendedHighlight: highlightMock,
  items: cartListMock,
  total: "R$ 330,00",
  cards: paymentOptionsMock
};

describe("<Cart />", () => {
  it("should render the sections", () => {
    renderWithTheme(<Cart {...props} />);

    expect(
      screen.getByRole("heading", { name: /my cart/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId("Mock CartList")).toBeInTheDocument();
    expect(screen.getByTestId("Mock PaymentOptions")).toBeInTheDocument();
    expect(screen.getByTestId("Mock Showcase")).toBeInTheDocument();
    expect(screen.queryByTestId("Mock Empty")).not.toBeInTheDocument();
  });

  it("should render empty section if there are no items", () => {
    renderWithTheme(<Cart {...props} items={[]} />);

    expect(screen.getByTestId("Mock Empty")).toBeInTheDocument();
  });
});
