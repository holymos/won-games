import { render, screen } from "utils/test-utils";

import * as S from "./styles";

import { Highlight } from ".";

const props = {
  title: "Heading 1",
  subtitle: "Heading 2",
  backgroundImg: "/img/red-dead-img.jpg",
  buttonLabel: "Buy now",
  buttonLink: "/rdr2"
};

describe("<Highlight />", () => {
  it("should render heading and button", () => {
    render(<Highlight {...props} />);

    expect(
      screen.getByRole("heading", { name: /heading 1/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /heading 2/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /buy now/i })).toBeInTheDocument();
  });

  it("should render a background image", () => {
    const { container } = render(<Highlight {...props} />);

    expect(container.firstChild).toHaveStyle({
      backgroundImage: `url:(${props.backgroundImg})`
    });
  });

  it("should render a float image", () => {
    render(<Highlight {...props} floatImg="/float-image.png" />);

    expect(screen.getByRole("img", { name: props.title })).toHaveAttribute(
      "src",
      "/float-image.png"
    );
  });

  it("should render aligned right by default", () => {
    const { container } = render(<Highlight {...props} />);

    expect(container.firstChild).toHaveStyleRule(
      "grid-template-areas",
      '"floatimage content"'
    );

    expect(container.firstChild).toHaveStyleRule("text-align", "right", {
      modifier: `${S.Content}`
    });
  });

  it("should render aligned left if alignment prop is passed", () => {
    const { container } = render(<Highlight {...props} alignment="left" />);

    expect(container.firstChild).toHaveStyleRule(
      "grid-template-areas",
      '"content floatimage"'
    );

    expect(container.firstChild).toHaveStyleRule("text-align", "left", {
      modifier: `${S.Content}`
    });
  });
});
