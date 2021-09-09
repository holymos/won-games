import { OrderList, OrderListProps } from "components/OrderList";
import { orderListMock } from "components/OrderList/mock";
import { Profile } from "pages/templates/Profile";

export default function Orders({ items }: OrderListProps) {
  return (
    <Profile>
      <OrderList items={items} />
    </Profile>
  );
}

export function getServerSideProps() {
  return {
    props: {
      items: orderListMock
    }
  };
}
