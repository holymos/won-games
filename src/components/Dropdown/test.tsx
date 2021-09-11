import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "utils/tests/helpers";

import { Dropdown } from ".";

describe("<Dropdown />", () => {
  beforeEach(() => {
    const title = <h1 aria-label="toggle dropdown">Click here</h1>;

    renderWithTheme(
      <Dropdown title={title}>
        <span> content</span>
      </Dropdown>
    );
  });

  it("should be closed by default", () => {
    const content = screen.getByText(/content/i).parentElement;

    expect(screen.getByLabelText(/toggle dropdown/i)).toBeInTheDocument();
    expect(content).toHaveStyle({ opacity: 0 });
  });

  it("should open dropdown when the title is clicked", () => {
    const content = screen.getByText(/content/i).parentElement;

    expect(content).toHaveStyle({ opacity: 0 });
    expect(content).toHaveAttribute("aria-hidden", "true");

    userEvent.click(screen.getByLabelText(/toggle dropdown/i));

    expect(content).toHaveStyle({ opacity: 1 });
    expect(content).toHaveAttribute("aria-hidden", "false");
  });
});
