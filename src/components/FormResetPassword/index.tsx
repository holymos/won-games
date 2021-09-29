import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import { Lock, ErrorOutline } from "@styled-icons/material-outlined";
import { Button } from "components/Button";
import { TextField } from "components/TextField";
import { FormWrapper, FormLoading, FormError } from "components/Form";

import { FormEvent, useState } from "react";

import { FieldErrors, resetValidate } from "utils/validations";

export function FormResetPassword() {
  const [formError, setFormError] = useState("");
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [values, setValues] = useState({ password: "", confirm_password: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { query } = router;

  function handleInput(field: string, value: string) {
    setValues((s) => ({
      ...s,
      [field]: value
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const errors = resetValidate(values);

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoading(false);
      setFormError("");
      return;
    }

    setFieldError({});

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: query.code,
          password: values.password,
          passwordConfirmation: values.confirm_password
        })
      }
    );

    const data = await response.json();
    setLoading(false);

    if (data.error) {
      setFormError(data.message[0].messages[0].message);
    } else {
      signIn("credentials", {
        email: data.user.email,
        password: values.password,
        callbackUrl: "/"
      });
      setFormError("");
    }
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
          name="password"
          placeholder="Password"
          type="password"
          error={fieldError.password}
          onInputChange={(v) => handleInput("password", v)}
          icon={<Lock />}
        />

        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          error={fieldError.confirm_password}
          onInputChange={(v) => handleInput("confirm_password", v)}
          type="password"
          icon={<Lock />}
        />

        <Button size="large" type="submit" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Reset Password</span>}
        </Button>
      </form>
    </FormWrapper>
  );
}
