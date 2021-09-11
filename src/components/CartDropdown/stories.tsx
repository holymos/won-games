import { Story, Meta } from "@storybook/react";
import { cartListMock } from "components/CartList/mock";
import { CartDropdown, CartDropdownProps } from ".";

export default {
  title: "CartDropdown",
  component: CartDropdown,
  parameters: {
    backgrounds: {
      default: "won-dark"
    }
  },
  args: {
    items: cartListMock,
    total: "R$ 300,00"
  }
} as Meta;

export const Default: Story<CartDropdownProps> = (args) => (
  <div style={{ maxWidth: "98%", display: "flex", justifyContent: "flex-end" }}>
    <CartDropdown {...args} />
  </div>
);

export const Empty: Story<CartDropdownProps> = () => (
  <div style={{ maxWidth: "98%", display: "flex", justifyContent: "flex-end" }}>
    <CartDropdown />
  </div>
);
