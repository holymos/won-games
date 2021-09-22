import Link from "next/link";

import { Button } from "components/Button";
import { GameItem } from "components/GameItem";

import * as S from "./styles";
import { Empty } from "components/Empty";
import { useCart } from "hooks/useCart";
import { Loader } from "components/Loader";

export type CartListProps = {
  hasButton?: boolean;
};

export function CartList({ hasButton = false }: CartListProps) {
  const { items, total, loading } = useCart();

  if (loading) {
    return (
      <S.Loading>
        <Loader />
      </S.Loading>
    );
  }

  return (
    <S.Wrapper isEmpty={!items.length}>
      {items.length ? (
        <>
          <S.GamesList>
            {items.map((item) => (
              <Link key={item.title} href={`/game/${item.slug}`} passHref>
                <a>
                  <GameItem {...item} />
                </a>
              </Link>
            ))}
          </S.GamesList>

          <S.Footer>
            {!hasButton && <span>Total:</span>}

            <S.Total>{total}</S.Total>

            {hasButton && (
              <Link href="/cart" passHref>
                <Button as="a">Buy it now</Button>
              </Link>
            )}
          </S.Footer>
        </>
      ) : (
        <Empty
          title="Your cart is empty"
          description="Go back to the store and explore the offers"
          hasLink
        />
      )}
    </S.Wrapper>
  );
}
