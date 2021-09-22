import { Story, Meta } from "@storybook/react";
import { Highlight, HighlightProps } from ".";

import { highlightMock } from "./mock";

export default {
  title: "Highlight",
  component: Highlight,
  args: { ...highlightMock }
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
  floatImg: "/img/red-dead-float.png"
};
