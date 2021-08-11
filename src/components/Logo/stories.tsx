import { Story, Meta } from "@storybook/react";
import { Logo, LogoProps } from ".";

export default {
  title: "Logo",
  component: Logo,
  args: {
    title: "title default",
    description: "description default"
  }
} as Meta;

export const Basic: Story = (args) => <Logo {...args} />;
Basic.args = {
  title: "title basic",
  description: "description basic"
};

export const Default: Story<LogoProps> = (args) => <Logo {...args} />;
