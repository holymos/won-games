import { Story, Meta } from "@storybook/react";
import { CartList, CartListProps } from ".";

import { cartListMock } from "./mock";

export default {
  title: "CartList",
  component: CartList,
  argTypes: {
    cartContextValue: {
      type: ""
    },
    items: {
      type: ""
    }
  },
  parameters: {
    backgrounds: {
      default: "won-dark"
    }
  }
} as Meta;

export const Default: Story = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} />
  </div>
);

Default.args = {
  total: "$330.00",
  cartContextValue: { items: cartListMock }
};

export const WithButton: Story = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} hasButton />
  </div>
);

WithButton.args = {
  total: "R$ 330,00",
  cartContextValue: { items: cartListMock }
};

export const Empty: Story<CartListProps> = () => (
  <div style={{ maxWidth: 800 }}>
    <CartList />
  </div>
);
