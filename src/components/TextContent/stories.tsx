import { Story, Meta } from "@storybook/react";
import { TextContent, TextContentProps } from ".";
import { textContentMock } from "./mock";

export default {
  title: "Game/TextContent",
  component: TextContent,
  parameters: {
    backgrounds: {
      default: "won-dark"
    }
  },
  args: textContentMock
} as Meta;

export const Default: Story<TextContentProps> = (args) => (
  <TextContent {...args} />
);
