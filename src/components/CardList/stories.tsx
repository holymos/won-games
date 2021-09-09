import { Story, Meta } from "@storybook/react";
import { paymentOptionsMock } from "components/PaymentOptions/mock";
import { CardList, CardListProps } from ".";

export default {
  title: "Profile/CardList",
  component: CardList,
  args: {
    cards: paymentOptionsMock
  }
} as Meta;

export const Default: Story<CardListProps> = (args) => (
  <div style={{ maxWidth: 860, margin: "0 auto" }}>
    <CardList {...args} />
  </div>
);
