import { PaymentIntent } from "@stripe/stripe-js";
import { CartItem } from "contexts/cartContext";

type FetcherParams = {
  url: string;
  body: string;
  token: string;
};

async function fetcher({ url, body, token }: FetcherParams) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body
  });

  return await response.json();
}

type PaymentIntentParams = {
  token: string;
  items: CartItem[];
};

export async function createPaymentIntent({
  token,
  items
}: PaymentIntentParams) {
  return fetcher({
    url: "/orders/create-payment-intent",
    body: JSON.stringify({ cart: items }),
    token
  });
}

type CreatePaymentParams = {
  items: CartItem[];
  paymentIntent?: PaymentIntent;
  token: string;
};

export async function createPayment({
  items,
  paymentIntent,
  token
}: CreatePaymentParams) {
  return fetcher({
    url: "/orders",
    body: JSON.stringify({
      cart: items,
      paymentIntentId: paymentIntent?.id,
      paymentMethod: paymentIntent?.payment_method
    }),
    token
  });
}
