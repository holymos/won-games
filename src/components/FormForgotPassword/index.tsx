import { FormEvent, useState } from "react";

import {
  CheckCircleOutline,
  Email,
  ErrorOutline
} from "@styled-icons/material-outlined";
import { Button } from "components/Button";
import { TextField } from "components/TextField";
import {
  FormWrapper,
  FormLoading,
  FormError,
  FormSuccess
} from "components/Form";

import { FieldErrors, forgotValidate } from "utils/validations";
import { useRouter } from "next/router";

export function FormForgotPassword() {
  const router = useRouter();
  const { query } = router;
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [values, setValues] = useState({
    email: (query.email as string) || ""
  });
  const [loading, setLoading] = useState(false);

  function handleInput(field: string, value: string) {
    setValues((s) => ({
      ...s,
      [field]: value
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const errors = forgotValidate(values);

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoading(false);
      setFormError("");
      return;
    }

    setFieldError({});

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      }
    );

    const data = await response.json();
    setLoading(false);

    if (data.error) {
      setFormError(data.message[0].messages[0].message);
    } else {
      setSuccess(true);
      setFormError("");
    }
  }

  return (
    <FormWrapper>
      {success ? (
        <FormSuccess>
          <CheckCircleOutline />
          You just received an e-mail
        </FormSuccess>
      ) : (
        <>
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
              type="text"
              initialValue={query.email as string}
              error={fieldError.email}
              onInputChange={(v) => handleInput("email", v)}
              icon={<Email />}
            />

            <Button size="large" type="submit" fullWidth disabled={loading}>
              {loading ? <FormLoading /> : <span>Send e-mail</span>}
            </Button>
          </form>
        </>
      )}
    </FormWrapper>
  );
}
