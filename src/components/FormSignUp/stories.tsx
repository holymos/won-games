import { Story, Meta } from "@storybook/react";
import { FormSignUp } from ".";

export default {
  title: "Form/FormSignUp",
  component: FormSignUp
} as Meta;

export const Default: Story = (args) => (
  <div style={{ width: 300, margin: "auto" }}>
    <FormSignUp {...args} />
  </div>
);
