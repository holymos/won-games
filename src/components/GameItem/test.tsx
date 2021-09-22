import userEvent from "@testing-library/user-event";
import { CartContextDefaultValues } from "contexts/cartContext";
import { render, screen } from "utils/test-utils";

import { GameItem } from ".";

const props = {
  id: "1",
  slug: "red-dead-redemption-2",
  img: "https://source.unsplash.com/user/willianjusten/151x70",
  title: "Red Dead Redemption 2",
  price: "$215.00"
};

describe("<GameItem />", () => {
  it("should render the component", () => {
    render(<GameItem {...props} />);

    expect(screen.getByRole("img", { name: props.title })).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: props.title })
    ).toBeInTheDocument();

    expect(screen.getByText(props.price)).toBeInTheDocument();
  });

  it("should render remove icon if the item is on the cart and call remove", () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      isInCart: () => true,
      removeFromCart: jest.fn()
    };

    render(<GameItem {...props} />, { cartProviderProps });

    const removeLink = screen.getByLabelText(/remove from cart/i);
    expect(removeLink).toBeInTheDocument();

    userEvent.click(removeLink);

    expect(cartProviderProps.removeFromCart).toHaveBeenCalledWith("1");
  });

  it("should render the component with download link", () => {
    const downloadLink = "https://link.com";

    render(<GameItem {...props} downloadLink={downloadLink} />);

    expect(
      screen.getByRole("link", { name: `Get ${props.title} here` })
    ).toHaveAttribute("href", downloadLink);
  });

  it("should render the payment info", () => {
    const paymentInfo = {
      flag: "mastercard",
      img: "/img/cards/mastercard.png",
      cardNumber: "**** **** **** 4326",
      purchaseDate: "Purchase made on 08/09/2021 at 22:56"
    };

    render(<GameItem {...props} paymentInfo={paymentInfo} />);

    expect(screen.getByRole("img", { name: paymentInfo.flag })).toHaveAttribute(
      "src",
      paymentInfo.img
    );

    expect(screen.getByText(paymentInfo.cardNumber)).toBeInTheDocument();
    expect(screen.getByText(paymentInfo.purchaseDate)).toBeInTheDocument();
  });
});
