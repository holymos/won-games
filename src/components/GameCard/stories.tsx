import { Story, Meta } from "@storybook/react";
import { CartContextData } from "contexts/cartContext";
import { GameCard, GameCardProps } from ".";

export default {
  title: "GameCard",
  component: GameCard,
  args: {
    slug: "population-zero",
    title: "Population Zero",
    developer: "Rockstar Games",
    img: "https://source.unsplash.com/user/willianjusten/1042x580",
    price: "#235.00"
  },
  argTypes: {
    onFav: {
      action: "clicked"
    },
    ribbon: {
      type: "string"
    }
  }
} as Meta;

export const Default: Story<GameCardProps> = (args) => (
  <div style={{ width: "30rem" }}>
    <GameCard {...args} />
  </div>
);

export const IsInCart: Story<GameCardProps & CartContextData> = (args) => (
  <div style={{ width: "30rem" }}>
    <GameCard {...args} />
  </div>
);

IsInCart.args = {
  isInCart: () => true
};

export const WithPromotion: Story<GameCardProps> = (args) => (
  <div style={{ width: "30rem" }}>
    <GameCard {...args} />
  </div>
);

WithPromotion.args = {
  promotionalPrice: "$200.00"
};

export const WithRibbon: Story<GameCardProps> = (args) => (
  <div style={{ width: "30rem" }}>
    <GameCard {...args} />
  </div>
);

WithRibbon.args = {
  promotionalPrice: "$200.00",
  ribbon: "20% OFF",
  ribbonSize: "small",
  ribbonColor: "primary"
};
