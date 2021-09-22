import { render, screen } from "utils/test-utils";

import { Ribbon } from ".";

describe("<Ribbon />", () => {
  it("should render text correctly", () => {
    render(<Ribbon>Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toBeInTheDocument();
  });

  it("should render primary color by default", () => {
    render(<Ribbon>Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toHaveStyle({
      backgroundColor: "#F231A5"
    });
  });

  it("should render secondary color if color prop is passed", () => {
    render(<Ribbon color="secondary">Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toHaveStyle({
      backgroundColor: "#3CD3C1"
    });
  });

  it("should render normal size font as default", () => {
    render(<Ribbon>Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toHaveStyle({
      height: "3.6rem",
      fontSize: "1.4rem"
    });
  });

  it("should render small size font if size prop is passed", () => {
    render(<Ribbon size="small">Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toHaveStyle({
      height: "2.6rem",
      fontSize: "1.2rem"
    });
  });
});
