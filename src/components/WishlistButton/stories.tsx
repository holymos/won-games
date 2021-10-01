import { Story, Meta } from "@storybook/react";
import { WishlistButton, WishlistButtonProps } from ".";

export default {
  title: "WishlistButton",
  component: WishlistButton,
  args: {
    id: "1"
  }
} as Meta;

export const Default: Story<WishlistButtonProps> = (args) => (
  <WishlistButton {...args} />
);
