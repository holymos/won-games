import { screen } from "@testing-library/react";
import { paymentOptionsMock } from "components/PaymentOptions/mock";
import { renderWithTheme } from "utils/tests/helpers";

import { CardList } from ".";

describe("<CardList />", () => {
  it("should render heading and card info", () => {
    renderWithTheme(<CardList cards={paymentOptionsMock} />);

    expect(screen.getByRole("heading", { name: /my cards/i }));

    expect(screen.getByRole("img", { name: /visa/ })).toHaveAttribute(
      "src",
      "/img/cards/visa.png"
    );

    expect(screen.getByText(/4325/)).toBeInTheDocument();
  });
});
