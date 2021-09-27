import { Button } from "components/Button";
import { Heading } from "components/Heading";
import { TextField } from "components/TextField";

import * as S from "./styles";

export type FormProfileProps = {
  username?: string;
  email?: string;
};

export function FormProfile({ username, email }: FormProfileProps) {
  return (
    <>
      <Heading lineBottom color="black" size="small">
        My profile
      </Heading>

      <S.Form>
        <TextField
          name="username"
          placeholder="Username"
          label="Username"
          initialValue={username}
        />

        <TextField
          name="email"
          placeholder="E-mail"
          type="email"
          label="E-mail"
          initialValue={email}
          disabled
        />

        <TextField
          name="password"
          placeholder="Type your password"
          type="password"
          label="Password"
        />

        <TextField
          name="new_password"
          placeholder="New password"
          type="password"
          label="New password"
        />

        <Button size="large">Save</Button>
      </S.Form>
    </>
  );
}
