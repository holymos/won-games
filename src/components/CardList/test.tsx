import { render, screen } from "utils/test-utils";

import { paymentOptionsMock } from "components/PaymentOptions/mock";

import { CardList } from ".";

describe("<CardList />", () => {
  it("should render heading and card info", () => {
    render(<CardList cards={paymentOptionsMock} />);

    expect(screen.getByRole("heading", { name: /my cards/i }));

    expect(screen.getByRole("img", { name: /visa/ })).toHaveAttribute(
      "src",
      "/img/cards/visa.png"
    );

    expect(screen.getByText(/4325/)).toBeInTheDocument();
  });
});
