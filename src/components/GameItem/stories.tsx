import { Story, Meta } from "@storybook/react";
import { GameItem, GameItemProps } from ".";

export default {
  title: "GameItem",
  component: GameItem,
  args: {
    image: "https://source.unsplash.com/user/willianjusten/151x70",
    title: "Red Dead Redemption 2",
    price: "$215.00"
  }
} as Meta;

export const Default: Story<GameItemProps> = (args) => <GameItem {...args} />;

export const WithPayment: Story<GameItemProps> = (args) => (
  <GameItem {...args} />
);

WithPayment.args = {
  downloadLink: "https://link.com/download",
  paymentInfo: {
    flag: "mastercard",
    img: "/img/cards/mastercard.png",
    cardNumber: "**** **** **** 4326",
    purchaseDate: "Purchase made on 08/09/2021 at 22:56"
  }
};
