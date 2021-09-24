import { GetServerSidePropsContext } from "next";
import { protectedRoutes } from "utils/protectedRoutes";

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  return {
    props: {
      session,
      items: orderListMock
    }
  };
}
