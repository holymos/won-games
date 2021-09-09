import { Story, Meta } from "@storybook/react";
import { CartList, CartListProps } from ".";
import { cartListMock } from "./mock";

export default {
  title: "CartList",
  component: CartList,
  parameters: {
    backgrounds: {
      default: "won-dark"
    }
  },
  args: {
    items: cartListMock,
    total: "R$ 330,00"
  },
  argTypes: {
    items: {
      type: ""
    }
  }
} as Meta;

export const Default: Story<CartListProps> = (args) => (
  <div style={{ maxWidth: 800, margin: "0 auto" }}>
    <CartList {...args} />
  </div>
);
