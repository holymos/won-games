import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import * as S from "./styles";

import { Highlight } from ".";

const props = {
  title: "Heading 1",
  subtitle: "Heading 2",
  backgroundImage: "/img/red-dead-img.jpg",
  buttonLabel: "Buy now",
  buttonLink: "/rdr2"
};

describe("<Highlight />", () => {
  it("should render heading and button", () => {
    renderWithTheme(<Highlight {...props} />);

    expect(
      screen.getByRole("heading", { name: /heading 1/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /heading 2/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /buy now/i })).toBeInTheDocument();
  });

  it("should render a background image", () => {
    const { container } = renderWithTheme(<Highlight {...props} />);

    expect(container.firstChild).toHaveStyle({
      backgroundImage: `url:(${props.backgroundImage})`
    });
  });

  it("should render a float image", () => {
    renderWithTheme(<Highlight {...props} floatImage="/float-image.png" />);

    expect(screen.getByRole("img", { name: props.title })).toHaveAttribute(
      "src",
      "/float-image.png"
    );
  });

  it("should render aligned right by default", () => {
    const { container } = renderWithTheme(<Highlight {...props} />);

    expect(container.firstChild).toHaveStyleRule(
      "grid-template-areas",
      '"floatimage content"'
    );

    expect(container.firstChild).toHaveStyleRule("text-align", "right", {
      modifier: `${S.Content}`
    });
  });

  it("should render aligned left if alignment prop is passed", () => {
    const { container } = renderWithTheme(
      <Highlight {...props} alignment="left" />
    );

    expect(container.firstChild).toHaveStyleRule(
      "grid-template-areas",
      '"content floatimage"'
    );

    expect(container.firstChild).toHaveStyleRule("text-align", "left", {
      modifier: `${S.Content}`
    });
  });
});
