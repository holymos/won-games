import { FormEvent, useEffect, useState } from "react";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { PaymentIntent, StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { ErrorOutline, ShoppingCart } from "@styled-icons/material-outlined";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { Heading } from "components/Heading";
import { Button } from "components/Button";

import theme from "styles/theme";

import { useCart } from "hooks/useCart";
import { createPayment, createPaymentIntent } from "utils/stripe/methods";

import * as S from "./styles";
import { FormLoading } from "components/Form";

const cardStyle = {
  base: { fontSize: "16px" },
  invalid: { iconColor: theme.colors.red, color: theme.colors.red }
};

type PaymentFormProps = {
  session: Session;
};

export function PaymentForm({ session }: PaymentFormProps) {
  const { items } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const { push } = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [freeGames, setFreeGames] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length) {
        // buscar dados na api /orders/create-payment-intent e enviar items do carrinho
        const data = await createPaymentIntent({
          token: session.jwt as string,
          items
        });

        // se receber freeGames: true => setFreeGames
        if (data.freeGames) {
          setFreeGames(true);
          return;
        }

        //se erro: setError
        if (data.error) {
          setError(data.error);
          return;
        }

        // se válido: setClientSecret
        setFreeGames(false);
        setClientSecret(data.client_secret);
      }
    }

    setPaymentMode();
  }, [items, session]);

  async function handleChange(event: StripeCardElementChangeEvent) {
    setDisabled(event.empty);
    setError(event.error ? event.error?.message : "");
  }

  async function saveOrder(paymentIntent?: PaymentIntent) {
    const data = await createPayment({
      items,
      paymentIntent,
      token: session.jwt as string
    });

    return data;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    // se for freeGames salva no banco redireciona para success
    if (freeGames) {
      saveOrder();

      push("/success");
      return;
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setLoading(false);
    } else {
      setError(null);
      setLoading(false);

      // salvar a compra no banco do Strapi
      saveOrder(payload.paymentIntent);

      // redirectionar para a página de Sucesso
      push("/success");
    }
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" lineBottom size="small">
            Payment
          </Heading>

          {freeGames ? (
            <S.FreeGames>Click buy and enjoy your free games</S.FreeGames>
          ) : (
            <>
              <CardElement
                options={{
                  hidePostalCode: true,
                  style: cardStyle
                }}
                onChange={handleChange}
              />
              {error && (
                <S.Error>
                  <ErrorOutline size={15} />
                  {error}
                </S.Error>
              )}
            </>
          )}
        </S.Body>

        <S.Footer>
          <Link href="/games" passHref>
            <Button as="a" fullWidth minimal>
              Continue shopping
            </Button>
          </Link>

          <Button
            fullWidth
            icon={loading ? <FormLoading /> : <ShoppingCart />}
            disabled={!freeGames && (disabled || !!error)}
          >
            {!loading && <span> Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  );
}
