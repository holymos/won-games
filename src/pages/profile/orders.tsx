import { GetServerSidePropsContext } from "next";
import { protectedRoutes } from "utils/protectedRoutes";

import { OrderList, OrderListProps } from "components/OrderList";
import { Profile } from "pages/templates/Profile";
import { initializeApollo } from "utils/apollo";
import {
  QueryOrders,
  QueryOrdersVariables
} from "graphql/generated/QueryOrders";
import { QUERY_ORDERS } from "graphql/queries/orders";
import { ordersMapper } from "utils/mappers";

export default function Orders({ items }: OrderListProps) {
  return (
    <Profile>
      <OrderList items={items} />
    </Profile>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);
  const apolloClient = initializeApollo(null, session);

  const { data } = await apolloClient.query<QueryOrders, QueryOrdersVariables>({
    query: QUERY_ORDERS,
    variables: {
      identifier: session?.id as string
    }
  });

  return {
    props: {
      session,
      items: ordersMapper(data.orders)
    }
  };
}
