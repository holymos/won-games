import "match-media-mock";
import { render, screen } from "utils/test-utils";

import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";

import { Showcase } from ".";

const props = {
  title: "Most popular",
  highlight: highlightMock,
  games: gamesMock.slice(0, 1)
};

describe("<Showcase />", () => {
  it("should render full showcase", () => {
    render(<Showcase {...props} />);

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
    render(<Showcase highlight={props.highlight} games={props.games} />);

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
    render(<Showcase title={props.title} games={props.games} />);

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
    render(<Showcase title={props.title} highlight={props.highlight} />);

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
