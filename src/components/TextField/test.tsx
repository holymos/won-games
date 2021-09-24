import { render, screen, waitFor } from "utils/test-utils";

import userEvent from "@testing-library/user-event";

import { TextField } from ".";
import { Email } from "@styled-icons/material-outlined";

describe("<TextField />", () => {
  it("Renders with Label", () => {
    render(<TextField label="Label" name="Label" />);

    expect(screen.getByLabelText("Label")).toBeInTheDocument();
  });

  it("Renders without Label", () => {
    render(<TextField />);

    expect(screen.queryByLabelText("Label")).not.toBeInTheDocument();
  });

  it("Renders with placeholder", () => {
    render(<TextField placeholder="hey you" />);

    expect(screen.getByPlaceholderText("hey you")).toBeInTheDocument();
  });

  it("Changes its value when typing", async () => {
    const onInputChange = jest.fn();

    render(
      <TextField
        onInputChange={onInputChange}
        label="TextField"
        name="TextField"
      />
    );

    const input = screen.getByRole("textbox");
    const text = "This is my new text";
    userEvent.type(input, text);

    await waitFor(() => {
      expect(input).toHaveValue(text);
      expect(onInputChange).toHaveBeenCalledTimes(text.length);
    });

    expect(onInputChange).toHaveBeenCalledWith(text);
  });

  it("Is accessible by tab", () => {
    render(<TextField label="TextField" name="TextField" />);

    const input = screen.getByLabelText("TextField");
    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(input).toHaveFocus();
  });

  it("should render an icon version", () => {
    render(<TextField icon={<Email data-testid="icon" />} />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("should render an icon on the right side", () => {
    render(
      <TextField icon={<Email data-testid="icon" />} iconPosition="right" />
    );

    expect(screen.getByTestId("icon").parentElement).toHaveStyle({ order: 1 });
  });

  it("should not change value when disabled", async () => {
    const onInputChange = jest.fn();

    render(
      <TextField
        onInputChange={onInputChange}
        label="Text Field"
        name="textField"
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

    expect(onInputChange).not.toHaveBeenCalled();
  });

  it("should not be accessible by tab  when disabled", async () => {
    render(<TextField label="Text Field" name="textField" disabled />);

    const input = screen.getByRole("textbox");
    expect(document.body).toHaveFocus();

    userEvent.tab();

    expect(input).not.toHaveFocus();
  });

  it("renders with error", () => {
    const { container } = render(
      <TextField
        icon={<Email />}
        label="Text Field"
        name="textField"
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
