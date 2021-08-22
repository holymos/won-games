import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { Ribbon } from ".";

describe("<Ribbon />", () => {
  it("should render text correctly", () => {
    renderWithTheme(<Ribbon>Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toBeInTheDocument();
  });

  it("should render primary color by default", () => {
    renderWithTheme(<Ribbon>Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toHaveStyle({
      backgroundColor: "#F231A5"
    });
  });

  it("should render secondary color if color prop is passed", () => {
    renderWithTheme(<Ribbon color="secondary">Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toHaveStyle({
      backgroundColor: "#3CD3C1"
    });
  });

  it("should render normal size font as default", () => {
    renderWithTheme(<Ribbon>Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toHaveStyle({
      height: "3.6rem",
      fontSize: "1.4rem"
    });
  });

  it("should render small size font if size prop is passed", () => {
    renderWithTheme(<Ribbon size="small">Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toHaveStyle({
      height: "2.6rem",
      fontSize: "1.2rem"
    });
  });
});
