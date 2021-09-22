import { Story, Meta } from "@storybook/react";
import { cartListMock } from "components/CartList/mock";
import { CartDropdown } from ".";

export default {
  title: "CartDropdown",
  component: CartDropdown,
  parameters: {
    backgrounds: {
      default: "won-dark"
    }
  }
} as Meta;

export const Default: Story = (args) => (
  <div style={{ maxWidth: "98%", display: "flex", justifyContent: "flex-end" }}>
    <CartDropdown {...args} />
  </div>
);

Default.args = {
  cartContextValue: {
    items: cartListMock,
    quantity: cartListMock.length,
    total: "$300.00"
  }
};

export const Empty: Story = () => (
  <div style={{ maxWidth: "98%", display: "flex", justifyContent: "flex-end" }}>
    <CartDropdown />
  </div>
);
