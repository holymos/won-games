import { Favorite, FavoriteBorder } from "@styled-icons/material-outlined";

import { useWishlist } from "hooks/useWishlist";
import { Button, ButtonProps } from "components/Button";
import { useSession } from "next-auth/client";
import { useState } from "react";
import { Spinner } from "components/Spinner";

export type WishlistButtonProps = {
  id: string;
  hasText?: boolean;
} & Pick<ButtonProps, "size">;

export function WishlistButton({
  id,
  hasText = false,
  size = "small"
}: WishlistButtonProps) {
  const [session] = useSession();
  const [loading, setLoading] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const ButtonText = isInWishlist(id)
    ? "Remove from Wishlist"
    : "Add to Wishlist";

  if (!session) return null;

  async function handleClick() {
    setLoading(true);
    isInWishlist(id) ? await removeFromWishlist(id) : await addToWishlist(id);
    setLoading(false);
  }

  return (
    <Button
      icon={
        loading ? (
          <Spinner />
        ) : isInWishlist(id) ? (
          <Favorite aria-label={ButtonText} />
        ) : (
          <FavoriteBorder aria-label={ButtonText} />
        )
      }
      minimal
      size={size}
      onClick={handleClick}
    >
      {hasText && ButtonText}
    </Button>
  );
}
