import { Empty } from "components/Empty";
import { GameItem, GameItemProps } from "components/GameItem";
import { Heading } from "components/Heading";

import * as S from "./styles";

export type OrderListProps = {
  items?: GameItemProps[];
};

export function OrderList({ items = [] }: OrderListProps) {
  return (
    <S.Wrapper>
      <Heading lineBottom color="black" size="small">
        My orders
      </Heading>

      {items.length ? (
        items.map((item) => <GameItem key={item.downloadLink} {...item} />)
      ) : (
        <Empty
          title="You have no orders yet"
          description="Go back to the store and explore the offers"
          hasLink
        />
      )}
    </S.Wrapper>
  );
}
