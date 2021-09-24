import Link from "next/link";
import { Email, Lock, ErrorOutline } from "@styled-icons/material-outlined";
import { Button } from "components/Button";
import { TextField } from "components/TextField";
import { FormWrapper, FormLink, FormLoading, FormError } from "components/Form";

import * as S from "./styles";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { FieldErrors, signInValidate } from "utils/validations";

export function FormSignIn() {
  const [formError, setFormError] = useState("");
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { push, query } = router;

  function handleInput(field: string, value: string) {
    setValues((s) => ({
      ...s,
      [field]: value
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const errors = signInValidate(values);

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoading(false);
      setFormError("");
      return;
    }

    setFieldError({});

    const result = await signIn("credentials", {
      ...values,
      redirect: false,
      callbackUrl: `${window.location.origin}${query?.callbackUrl || ""}`
    });

    if (result?.url) {
      return push(result.url);
    }

    setLoading(false);

    //jogar erro
    setFormError("username or password is invalid");
  }

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline />
          <span>{formError}</span>
        </FormError>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="E-mail"
          type="email"
          error={fieldError.email}
          onInputChange={(v) => handleInput("email", v)}
          icon={<Email />}
        />

        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldError.password}
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
