import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { EmailOutline } from "@styled-icons/evaicons-outline/EmailOutline";

import { renderWithTheme } from "utils/tests/helpers";

import { TextField } from ".";

describe("<TextField />", () => {
  it("Renders with Label", () => {
    renderWithTheme(<TextField label="Label" labelFor="Field" id="Field" />);

    expect(screen.getByLabelText("Label")).toBeInTheDocument();
  });

  it("Renders without Label", () => {
    renderWithTheme(<TextField />);

    expect(screen.queryByLabelText("Label")).not.toBeInTheDocument();
  });

  it("Renders with placeholder", () => {
    renderWithTheme(<TextField placeholder="hey you" />);

    expect(screen.getByPlaceholderText("hey you")).toBeInTheDocument();
  });

  it("Changes its value when typing", async () => {
    const onInput = jest.fn();

    renderWithTheme(
      <TextField
        onInput={onInput}
        label="TextField"
        labelFor="TextField"
        id="TextField"
      />
    );

    const input = screen.getByRole("textbox");
    const text = "This is my new text";
    userEvent.type(input, text);

    await waitFor(() => {
      expect(input).toHaveValue(text);
      expect(onInput).toHaveBeenCalledTimes(text.length);
    });

    expect(onInput).toHaveBeenCalledWith(text);
  });

  it("Is accessible by tab", () => {
    renderWithTheme(
      <TextField label="TextField" labelFor="TextField" id="TextField" />
    );

    const input = screen.getByLabelText("TextField");
    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(input).toHaveFocus();
  });

  it("should render an icon version", () => {
    renderWithTheme(<TextField icon={<EmailOutline data-testid="icon" />} />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("should render an icon on the right side", () => {
    renderWithTheme(
      <TextField
        icon={<EmailOutline data-testid="icon" />}
        iconPosition="right"
      />
    );

    expect(screen.getByTestId("icon").parentElement).toHaveStyle({ order: 1 });
  });

  it("should not change value when disabled", async () => {
    const onInput = jest.fn();

    renderWithTheme(
      <TextField
        onInput={onInput}
        label="Text Field"
        labelFor="textField"
        id="textField"
        disabled
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();

    const text = "This is my new text";
    userEvent.type(input, text);

    await waitFor(() => {
      expect(input).not.toHaveValue(text);
    });

    expect(onInput).not.toHaveBeenCalled();
  });

  it("should not be accessible by tab  when disabled", async () => {
    renderWithTheme(
      <TextField
        label="Text Field"
        labelFor="textField"
        id="textField"
        disabled
      />
    );

    const input = screen.getByRole("textbox");
    expect(document.body).toHaveFocus();

    userEvent.tab();

    expect(input).not.toHaveFocus();
  });

  it("renders with error", () => {
    const { container } = renderWithTheme(
      <TextField
        icon={<EmailOutline />}
        label="Text Field"
        labelFor="textField"
        id="textField"
        error="erro"
      />
    );

    const error = screen.getByText(/erro/i);
    const input = screen.getByRole("textbox");

    expect(error).toBeInTheDocument();
    expect(input.parentElement).toHaveStyle({ borderColor: "#FF6347" });
    expect(container).toMatchSnapshot();
  });
});
