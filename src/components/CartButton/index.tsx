import {
  AddShoppingCart,
  RemoveShoppingCart
} from "@styled-icons/material-outlined";
import { Button, ButtonProps } from "components/Button";
import { useCart } from "hooks/useCart";

type CartButtonProps = {
  id: string;
  hasText?: boolean;
} & Pick<ButtonProps, "size">;

export function CartButton({
  id,
  size = "small",
  hasText = false
}: CartButtonProps) {
  const { isInCart, addToCart, removeFromCart } = useCart();
  const ButtonText = isInCart(id) ? "Remove from cart" : "Add to cart";

  function handleClick() {
    isInCart(id) ? removeFromCart(id) : addToCart(id);
  }

  return (
    <Button
      icon={isInCart(id) ? <RemoveShoppingCart /> : <AddShoppingCart />}
      size={size}
      onClick={handleClick}
      aria-label={ButtonText}
    >
      {hasText && ButtonText}
    </Button>
  );
}
