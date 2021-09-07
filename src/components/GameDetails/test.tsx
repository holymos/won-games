import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { GameDetails } from ".";

import { gameDetailsMock } from "./mock";

describe("<GameDetails />", () => {
  it("should render the blocks", () => {
    renderWithTheme(<GameDetails {...gameDetailsMock} />);

    expect(
      screen.getByRole("heading", { name: /developer/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /release date/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /platforms/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /publisher/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /rating/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /genre/i })).toBeInTheDocument();
  });

  it("should render the platform icons", () => {
    renderWithTheme(<GameDetails {...gameDetailsMock} />);

    expect(screen.getByRole("img", { name: /linux/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /windows/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /mac/i })).toBeInTheDocument();
  });

  it("should render the formatted date", () => {
    renderWithTheme(<GameDetails {...gameDetailsMock} />);

    expect(screen.getByText("Nov 21, 2020")).toBeInTheDocument();
  });

  it("should render free rating when BR0", () => {
    renderWithTheme(<GameDetails {...gameDetailsMock} />);

    expect(screen.getByText(/free/i)).toBeInTheDocument();
  });

  it("should render 18+ rating when BR18", () => {
    renderWithTheme(<GameDetails {...gameDetailsMock} rating="BR18" />);

    expect(screen.getByText(/18\+/i)).toBeInTheDocument();
  });

  it("should render a list of genres", () => {
    renderWithTheme(
      <GameDetails {...gameDetailsMock} genre={["Role-playing", "Narrative"]} />
    );

    expect(screen.getByText(/role-playing\/narrative/i)).toBeInTheDocument();
  });
});
