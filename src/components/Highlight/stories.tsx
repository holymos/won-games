import { Story, Meta } from "@storybook/react";
import { Highlight, HighlightProps } from ".";

export default {
  title: "Highlight",
  component: Highlight,
  args: {
    title: "Red Dead it's back",
    subtitle: "Come see John's new adventure",
    backgroundImage: "/img/red-dead-img.jpg",
    buttonLabel: "Buy now",
    buttonLink: "/rdr2"
  }
} as Meta;

export const Default: Story<HighlightProps> = (args) => (
  <div style={{ maxWidth: "104rem", margin: "0 auto" }}>
    <Highlight {...args} />
  </div>
);

export const WithFloatImage: Story<HighlightProps> = (args) => (
  <div style={{ maxWidth: "104rem", margin: "0 auto" }}>
    <Highlight {...args} />
  </div>
);

WithFloatImage.args = {
  floatImage: "/img/red-dead-float.png"
};
