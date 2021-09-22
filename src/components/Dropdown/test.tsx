import { render, screen } from "utils/test-utils";
import userEvent from "@testing-library/user-event";

import { Dropdown } from ".";

describe("<Dropdown />", () => {
  beforeEach(() => {
    const title = <h1 aria-label="toggle dropdown">Click here</h1>;

    render(
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

  it("should handle open/close dropdown", () => {
    const content = screen.getByText(/content/i).parentElement;

    expect(content).toHaveStyle({ opacity: 0 });
    expect(content).toHaveAttribute("aria-hidden", "true");

    userEvent.click(screen.getByLabelText(/toggle dropdown/i));

    expect(content).toHaveStyle({ opacity: 1 });
    expect(content).toHaveAttribute("aria-hidden", "false");
  });

  it("should handle close dropdown when overlay is clicked", () => {
    const content = screen.getByText(/content/i).parentElement;
    const overlay = content?.nextElementSibling;

    userEvent.click(screen.getByLabelText(/toggle dropdown/i));

    expect(overlay).toHaveStyle({ opacity: 1 });
    expect(overlay).toHaveAttribute("aria-hidden", "false");

    userEvent.click(overlay!);

    expect(overlay).toHaveStyle({ opacity: 0 });
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });
});
