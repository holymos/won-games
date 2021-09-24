import Link from "next/link";
import { Email, Lock } from "@styled-icons/material-outlined";
import { Button } from "components/Button";
import { TextField } from "components/TextField";
import { FormWrapper, FormLink, FormLoading } from "components/Form";

import * as S from "./styles";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

export function FormSignIn() {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  function handleInput(field: string, value: string) {
    setValues((s) => ({
      ...s,
      [field]: value
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      ...values,
      redirect: false,
      callbackUrl: "/"
    });

    if (result?.url) {
      return push(result.url);
    }

    setLoading(false);
    console.error("Email ou senha inválida");
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="E-mail"
          type="email"
          onInputChange={(v) => handleInput("email", v)}
          icon={<Email />}
        />

        <TextField
          name="password"
          placeholder="Password"
          type="password"
          onInputChange={(v) => handleInput("password", v)}
          icon={<Lock />}
        />

        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

        <Button size="large" type="submit" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Sign in</span>}
        </Button>

        <FormLink>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  );
}
