import { Story, Meta } from "@storybook/react";
import { TextField, TextFieldProps } from ".";

import { EmailOutline } from "@styled-icons/evaicons-outline/EmailOutline";

export default {
  title: "Form/TextField",
  component: TextField,
  args: {
    label: "E-mail",
    labelFor: "Email",
    icon: <EmailOutline />,
    id: "Email",
    initialValue: "",
    placeholder: "john.cage@gmail.com"
  },
  argTypes: {
    onInput: { action: "changed" },
    icon: {
      type: ""
    }
  }
} as Meta;

export const Default: Story<TextFieldProps> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
    <TextField {...args} />
  </div>
);

export const WithError: Story<TextFieldProps> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
    <TextField {...args} />
  </div>
);

WithError.args = {
  error: "E-mail inválido"
};
