import "match-media-mock";
import { screen } from "@testing-library/react";
import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";
import { renderWithTheme } from "utils/tests/helpers";

import { Showcase } from ".";

const props = {
  title: "Most popular",
  highlight: highlightMock,
  games: gamesMock.slice(0, 1)
};

describe("<Showcase />", () => {
  it("should render full showcase", () => {
    renderWithTheme(<Showcase {...props} />);

    expect(
      screen.getByRole("heading", { name: /most popular/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: highlightMock.title })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: gamesMock[0].title })
    ).toBeInTheDocument();
  });

  it("should render showcase without title", () => {
    renderWithTheme(
      <Showcase highlight={props.highlight} games={props.games} />
    );

    expect(
      screen.queryByRole("heading", { name: /most popular/i })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: highlightMock.title })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: gamesMock[0].title })
    ).toBeInTheDocument();
  });

  it("should render showcase without highlight", () => {
    renderWithTheme(<Showcase title={props.title} games={props.games} />);

    expect(
      screen.getByRole("heading", { name: /most popular/i })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: highlightMock.title })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: gamesMock[0].title })
    ).toBeInTheDocument();
  });

  it("should render showcase without games", () => {
    renderWithTheme(
      <Showcase title={props.title} highlight={props.highlight} />
    );

    expect(
      screen.getByRole("heading", { name: /most popular/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: highlightMock.title })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: gamesMock[0].title })
    ).not.toBeInTheDocument();
  });
});
