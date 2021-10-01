import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

import { GameCardProps } from "components/GameCard";
import { useQueryWishlist } from "graphql/queries/wishlist";
import { useSession } from "next-auth/client";
import { gamesMapper } from "utils/mappers";
import { QueryWishlist_wishlists_games } from "graphql/generated/QueryWishlist";
import { useMutation } from "@apollo/client";
import {
  MUTATION_CREATE_WISHLIST,
  MUTATION_UPDATE_WISHLIST
} from "graphql/mutations/wishlist";

export type WishlistContextData = {
  items: GameCardProps[];
  isInWishlist: (id: string) => boolean;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  loading: boolean;
};

export const WishlistContextDefaultValues = {
  loading: false,
  items: [],
  isInWishlist: () => false,
  addToWishlist: () => null,
  removeFromWishlist: () => null
};

export const WishlistContext = createContext<WishlistContextData>(
  WishlistContextDefaultValues
);

export type WishlistContextProviderProps = {
  children: ReactNode;
};

export function WishlistContextProvider({
  children
}: WishlistContextProviderProps) {
  const [session] = useSession();
  const [wishlist, setwishlist] = useState<string | null>();
  const [wishlistItems, setWishlistItems] = useState<
    QueryWishlist_wishlists_games[]
  >([]);

  const [createList, { loading: loadingCreate }] = useMutation(
    MUTATION_CREATE_WISHLIST,
    {
      context: { session },
      onCompleted: (data) => {
        setWishlistItems(data?.createWishlist?.wishlist?.games || []);
        setwishlist(data?.createWishlist?.wishlist?.id);
      }
    }
  );

  const [updateList, { loading: loadingUpdate }] = useMutation(
    MUTATION_UPDATE_WISHLIST,
    {
      context: { session },
      onCompleted: (data) => {
        setWishlistItems(data?.updateWishlist?.wishlist?.games || []);
      }
    }
  );

  const { data, loading: loadingQuery } = useQueryWishlist({
    skip: !session?.user?.email,
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  });

  useEffect(() => {
    setWishlistItems(data?.wishlists[0]?.games || []);
    setwishlist(data?.wishlists[0]?.id);
  }, [data]);

  function isInWishlist(id: string) {
    return wishlistItems.some((game) => game.id === id);
  }

  const wishlists = useMemo(
    () => wishlistItems.map((game) => game.id),
    [wishlistItems]
  );

  function addToWishlist(id: string) {
    // se não existir wishlist, criar
    if (!wishlist) {
      return createList({
        variables: {
          input: { data: { games: [...wishlists, id] } }
        }
      });
    }

    // se existir, atualiza
    return updateList({
      variables: {
        input: {
          where: { id: wishlist },
          data: { games: [...wishlists, id] }
        }
      }
    });
  }

  function removeFromWishlist(id: string) {
    updateList({
      variables: {
        input: {
          where: { id: wishlist },
          data: { games: wishlists.filter((gameId) => gameId !== id) }
        }
      }
    });
  }

  return (
    <WishlistContext.Provider
      value={{
        loading: loadingQuery || loadingCreate || loadingUpdate,
        items: gamesMapper(wishlistItems),
        isInWishlist,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
