import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "utils/test-utils";

import { FormSignUp } from ".";

describe("<FormSignUp />", () => {
  it("should render the form", () => {
    const { container } = render(
      <MockedProvider>
        <FormSignUp />
      </MockedProvider>
    );

    //verificar email, password e button
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();

    expect(container.parentElement).toMatchSnapshot();
  });

  it("should render the text and link to sign in", () => {
    render(
      <MockedProvider>
        <FormSignUp />
      </MockedProvider>
    );

    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();
  });
});
