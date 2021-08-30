import { Story, Meta } from "@storybook/react";
import { Button, ButtonProps } from ".";
import { AddShoppingCart } from "@styled-icons/material-outlined/AddShoppingCart";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    children: {
      type: "string"
    },
    icon: {
      type: ""
    }
  }
} as Meta;

export const Default: Story<ButtonProps> = (args) => <Button {...args} />;

Default.args = {
  children: "Buy now"
};

export const WithIcon: Story<ButtonProps> = (args) => <Button {...args} />;

WithIcon.args = {
  size: "small",
  children: "Buy now",
  icon: <AddShoppingCart />
};

export const AsLink: Story<ButtonProps> = (args) => <Button {...args} />;

AsLink.args = {
  size: "large",
  children: "Buy now",
  as: "a",
  href: "/link"
};

export const Minimal: Story<ButtonProps> = (args) => <Button {...args} />;

Minimal.args = {
  size: "large",
  children: "Buy now",
  icon: <AddShoppingCart />,
  minimal: true
};
