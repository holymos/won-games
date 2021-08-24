import { Story, Meta } from "@storybook/react";
import { GameCard, GameCardProps } from ".";

export default {
  title: "GameCard",
  component: GameCard,
  args: {
    title: "Population Zero",
    developer: "Rockstar Games",
    img: "https://source.unsplash.com/user/willianjusten/1042x580",
    price: "R$ 235,00"
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

export const WithPromotion: Story<GameCardProps> = (args) => (
  <div style={{ width: "30rem" }}>
    <GameCard {...args} />
  </div>
);

WithPromotion.args = {
  promotionalPrice: "R$ 200,00"
};

export const WithRibbon: Story<GameCardProps> = (args) => (
  <div style={{ width: "30rem" }}>
    <GameCard {...args} />
  </div>
);

WithRibbon.args = {
  promotionalPrice: "R$ 200,00",
  ribbon: "20% OFF",
  ribbonSize: "small",
  ribbonColor: "primary"
};
