import { Story, Meta } from "@storybook/react";
import { TextField, TextFieldProps } from ".";

import { Email } from "@styled-icons/material-outlined/Email";

export default {
  title: "Form/TextField",
  component: TextField,
  args: {
    label: "E-mail",
    name: "Email",
    icon: <Email />,
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
