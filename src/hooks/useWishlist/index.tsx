import { WishlistContext } from "contexts/wishlistContext";
import { useContext } from "react";

export function useWishlist() {
  return useContext(WishlistContext);
}
