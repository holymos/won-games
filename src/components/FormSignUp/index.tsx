import { FormEvent, useState } from "react";
import Link from "next/link";
import { UsersPermissionsRegisterInput } from "graphql/generated/globalTypes";
import { AccountCircle, Email, Lock } from "@styled-icons/material-outlined";
import { useMutation } from "@apollo/client";
import { MUTATION_REGISTER } from "graphql/mutations/register";

import { Button } from "components/Button";
import { TextField } from "components/TextField";
import { FormWrapper, FormLink, FormLoading } from "components/Form";
import { signIn } from "next-auth/client";

export function FormSignUp() {
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const [createUser, { error, loading }] = useMutation(MUTATION_REGISTER, {
    onError: (err) => console.log(err),
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
    setIsLoading(true);

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
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          placeholder="Username"
          type="text"
          onInputChange={(v) => handleInput("username", v)}
          icon={<AccountCircle />}
        />

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

        <TextField
          name="confirm-password"
          placeholder="Confirm password"
          onInputChange={(v) => handleInput("confirm-password", v)}
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
