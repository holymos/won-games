import { Story, Meta } from "@storybook/react";
import { GameCardProps } from "components/GameCard";
import { GameCardSlider } from ".";

import { gamesMock } from "./mock";

export default {
  title: "GameCardSlider",
  component: GameCardSlider,
  args: { items: gamesMock },
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "won-dark"
    }
  }
} as Meta;

export const Default: Story<GameCardProps[]> = (args) => (
  <div style={{ maxWidth: "104rem", margin: "0 auto" }}>
    <GameCardSlider items={args} {...args} />
  </div>
);
