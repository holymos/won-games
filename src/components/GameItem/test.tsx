import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { GameItem } from ".";

const props = {
  image: "https://source.unsplash.com/user/willianjusten/151x70",
  title: "Red Dead Redemption 2",
  price: "R$ 215,00"
};

describe("<GameItem />", () => {
  it("should render the component", () => {
    renderWithTheme(<GameItem {...props} />);

    expect(screen.getByRole("img", { name: props.title })).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: props.title })
    ).toBeInTheDocument();

    expect(screen.getByText(props.price)).toBeInTheDocument();
  });

  it("should render the component with download link", () => {
    const downloadLink = "https://link.com";

    renderWithTheme(<GameItem {...props} downloadLink={downloadLink} />);

    expect(
      screen.getByRole("link", { name: `Get ${props.title} here` })
    ).toHaveAttribute("href", downloadLink);
  });

  it("should render the payment info", () => {
    const paymentInfo = {
      flag: "mastercard",
      image: "/img/cards/mastercard.png",
      cardNumber: "**** **** **** 4326",
      purchaseDate: "Purchase made on 08/09/2021 at 22:56"
    };

    renderWithTheme(<GameItem {...props} paymentInfo={paymentInfo} />);

    expect(screen.getByRole("img", { name: paymentInfo.flag })).toHaveAttribute(
      "src",
      paymentInfo.image
    );

    expect(screen.getByText(paymentInfo.cardNumber)).toBeInTheDocument();
    expect(screen.getByText(paymentInfo.purchaseDate)).toBeInTheDocument();
  });
});
