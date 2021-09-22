import { render, screen } from "utils/test-utils";

import { Heading } from ".";

describe("<Heading />", () => {
  it("should render a white heading by default", () => {
    render(<Heading>Won Games</Heading>);

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveStyle({
      color: "#FAFAFA"
    });
  });

  it("should render a white heading if color prop is passed", () => {
    render(<Heading color="white">Won Games</Heading>);

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveStyle({
      color: "#FAFAFA"
    });
  });

  it("should render a heading with a line to the left side if lineLeft prop is passed", () => {
    render(<Heading lineLeft>Won Games</Heading>);

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveStyle({
      "border-left": "0.7rem solid #F231A5"
    });
  });

  it("should render a heading with a line at the bottom if lineBottom prop is passed", () => {
    render(<Heading lineBottom>Won Games</Heading>);

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveStyleRule(
      "border-bottom",
      "0.5rem solid #F231A5",
      {
        modifier: "::after"
      }
    );
  });

  it("should render a heading with a small size", () => {
    render(<Heading size="small">Won Games</Heading>);

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveStyle({
      "font-size": "1.6rem"
    });

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveStyleRule(
      "width",
      "3rem",
      {
        modifier: "::after"
      }
    );
  });

  it("should render a heading with a huge size", () => {
    render(<Heading size="huge">Won Games</Heading>);

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveStyle({
      "font-size": "5.2rem"
    });
  });

  it("should render a heading with a line having a primary color if lineColor prop is passed", () => {
    render(
      <Heading lineLeft lineBottom lineColor="primary">
        Lorem Ipsum
      </Heading>
    );

    const heading = screen.getByRole("heading", { name: /lorem ipsum/i });
    expect(heading).toHaveStyle({ "border-left": "0.7rem solid #F231A5" });
    expect(heading).toHaveStyleRule("border-bottom", "0.5rem solid #F231A5", {
      modifier: "::after"
    });
  });

  it("should render a heading with a line having a secondary color if lineColor prop is passed", () => {
    render(
      <Heading lineLeft lineBottom lineColor="secondary">
        Lorem Ipsum
      </Heading>
    );

    const heading = screen.getByRole("heading", { name: /lorem ipsum/i });
    expect(heading).toHaveStyle({ "border-left": "0.7rem solid #3CD3C1" });
    expect(heading).toHaveStyleRule("border-bottom", "0.5rem solid #3CD3C1", {
      modifier: "::after"
    });
  });
});
