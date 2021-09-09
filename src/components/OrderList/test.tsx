import { screen } from "@testing-library/react";
import { ReactNode } from "react";
import { renderWithTheme } from "utils/tests/helpers";

import { OrderList } from ".";
import { orderListMock } from "./mock";

jest.mock("components/Empty", () => ({
  __esModule: true,
  Empty: function Mock() {
    return <div data-testid="Mock Empty"></div>;
  }
}));

jest.mock("components/GameItem", () => ({
  __esModule: true,
  GameItem: function Mock({ children }: { children: ReactNode }) {
    return <div data-testid="Mock GameItem">{children}</div>;
  }
}));

describe("<OrderList />", () => {
  it("should render the game items", () => {
    renderWithTheme(<OrderList items={orderListMock} />);

    expect(
      screen.getByRole("heading", { name: /my orders/i })
    ).toBeInTheDocument();

    expect(screen.getAllByTestId("Mock GameItem")).toHaveLength(2);

    expect(screen.queryByTestId("Mock Empty")).not.toBeInTheDocument();
  });

  it("should render empty component if no orders", () => {
    renderWithTheme(<OrderList />);

    expect(screen.getByTestId("Mock Empty")).toBeInTheDocument();

    expect(screen.queryByTestId("Mock GameItem")).not.toBeInTheDocument();
  });
});
