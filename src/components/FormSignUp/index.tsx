import { FormEvent, useState } from "react";
import Link from "next/link";
import { UsersPermissionsRegisterInput } from "graphql/generated/globalTypes";
import {
  AccountCircle,
  Email,
  ErrorOutline,
  Lock
} from "@styled-icons/material-outlined";
import { useMutation } from "@apollo/client";
import { MUTATION_REGISTER } from "graphql/mutations/register";

import { Button } from "components/Button";
import { TextField } from "components/TextField";
import { FormWrapper, FormLink, FormLoading, FormError } from "components/Form";
import { signIn } from "next-auth/client";
import { FieldErrors, signUpValidate } from "utils/validations";

export function FormSignUp() {
  const [formError, setFormError] = useState("");
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const [createUser, { error, loading }] = useMutation(MUTATION_REGISTER, {
    onError: (err) =>
      setFormError(
        err?.graphQLErrors[0]?.extensions?.exception.data.message[0].messages[0]
          .message
      ),
    onCompleted: () => {
      !error &&
        signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: "/"
        });
    }
  });

  function handleInput(field: string, value: string) {
    setValues((s) => ({
      ...s,
      [field]: value
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);

    const errors = signUpValidate(values);

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setIsLoading(false);
      setFormError("");
      return;
    }

    setFieldError({});

    createUser({
      variables: {
        input: {
          username: values.username,
          email: values.email,
          password: values.password
        }
      }
    });

    setIsLoading(false);
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
          name="username"
          placeholder="Username"
          type="text"
          error={fieldError.username}
          onInputChange={(v) => handleInput("username", v)}
          icon={<AccountCircle />}
        />

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

        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          error={fieldError.confirm_password}
          onInputChange={(v) => handleInput("confirm_password", v)}
          type="password"
          icon={<Lock />}
        />

        <Button size="large" type="submit" fullWidth disabled={isLoading}>
          {loading ? <FormLoading /> : <span>Sign up</span>}
        </Button>

        <FormLink>
          Already have an account?{" "}
          <Link href="/sign-in">
            <a>Sign in</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  );
}
