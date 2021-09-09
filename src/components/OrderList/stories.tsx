import { Story, Meta } from "@storybook/react";
import { OrderList, OrderListProps } from ".";
import { orderListMock } from "./mock";

export default {
  title: "Profile/OrderList",
  component: OrderList,
  args: {
    items: orderListMock
  }
} as Meta;

export const Default: Story<OrderListProps> = (args) => (
  <div style={{ maxWidth: 860, margin: "0 auto" }}>
    <OrderList {...args} />
  </div>
);

export const WithoutOrders: Story<OrderListProps> = (args) => (
  <div style={{ maxWidth: 860, margin: "0 auto" }}>
    <OrderList {...args} />
  </div>
);

WithoutOrders.args = {
  items: []
};
