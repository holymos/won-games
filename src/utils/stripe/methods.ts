import { CartItem } from "contexts/cartContext";

type PaymentIntentParams = {
  token: string;
  items: CartItem[];
};

export async function createPaymentIntent({
  token,
  items
}: PaymentIntentParams) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/create-payment-intent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ cart: items })
    }
  );

  return await response.json();
}
