import { useQueryGames } from "graphql/queries/games";
import { createContext, ReactNode, useEffect, useState } from "react";
import { formatPrice } from "utils/formatPrice";
import { getStorageItem, setStorageItem } from "utils/localStorage";
import { cartMapper } from "utils/mappers";

const CART_KEY = "cartItems";

type CartItem = {
  id: string;
  img: string;
  title: string;
  price: string;
  slug: string;
};

export type CartContextData = {
  loading: boolean;
  items: CartItem[];
  quantity: number;
  total: string;
  isInCart: (id: string) => boolean;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const CartContextDefaultValues = {
  loading: false,
  items: [],
  quantity: 0,
  total: "$0.00",
  isInCart: () => false,
  addToCart: () => null,
  removeFromCart: () => null,
  clearCart: () => null
};

export const CartContext = createContext<CartContextData>(
  CartContextDefaultValues
);

export type CartContextProviderProps = {
  children: ReactNode;
};

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setcartItems] = useState<string[]>([]);

  useEffect(() => {
    const data = getStorageItem(CART_KEY);

    if (data) {
      setcartItems(data);
    }
  }, []);

  const { data, loading } = useQueryGames({
    skip: !cartItems?.length,
    variables: {
      where: {
        id: cartItems
      }
    }
  });

  const total = data?.games.reduce((acc, game) => {
    return acc + game.price;
  }, 0);

  function isInCart(id: string) {
    return cartItems.includes(id);
  }

  function saveCart(cartItems: string[]) {
    setcartItems(cartItems);
    setStorageItem(CART_KEY, cartItems);
  }

  function addToCart(id: string) {
    const newCartItems = [...cartItems, id];
    saveCart(newCartItems);
  }

  function removeFromCart(id: string) {
    const newCartItems = cartItems.filter((itemId: string) => itemId !== id);
    saveCart(newCartItems);
  }

  function clearCart() {
    saveCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        loading,
        items: cartMapper(data?.games),
        quantity: cartItems.length,
        total: formatPrice(total || 0),
        isInCart,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
