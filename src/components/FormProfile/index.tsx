import { Button } from "components/Button";
import { Heading } from "components/Heading";
import { TextField } from "components/TextField";

import * as S from "./styles";

export function FormProfile() {
  return (
    <>
      <Heading lineBottom color="black" size="small">
        My profile
      </Heading>

      <S.Form>
        <TextField
          name="name"
          placeholder="Name"
          label="Name"
          initialValue="Darth Vader"
        />

        <TextField
          name="email"
          placeholder="E-mail"
          type="email"
          label="E-mail"
          initialValue="darthvader@email.com"
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
