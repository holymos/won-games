import { Story, Meta } from "@storybook/react";
import { FormProfile } from ".";

export default {
  title: "Form/FormProfile",
  component: FormProfile
} as Meta;

export const Default: Story = (args) => (
  <div style={{ maxWidth: 860, margin: "0 auto" }}>
    <FormProfile {...args} />
  </div>
);
