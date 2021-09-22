import { render, screen } from "utils/test-utils";

import { GameDetails } from ".";

import { gameDetailsMock } from "./mock";

describe("<GameDetails />", () => {
  it("should render the blocks", () => {
    render(<GameDetails {...gameDetailsMock} />);

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
    render(<GameDetails {...gameDetailsMock} />);

    expect(screen.getByRole("img", { name: /linux/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /windows/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /mac/i })).toBeInTheDocument();
  });

  it("should render the formatted date", () => {
    render(<GameDetails {...gameDetailsMock} />);

    expect(screen.getByText("Nov 21, 2020")).toBeInTheDocument();
  });

  it("should render the developer", () => {
    render(<GameDetails {...gameDetailsMock} />);

    expect(screen.getByText(/different tales/i)).toBeInTheDocument();
  });

  it("should render the publisher", () => {
    render(<GameDetails {...gameDetailsMock} />);

    expect(screen.getByText(/walkabout/i)).toBeInTheDocument();
  });

  it("should render free rating when BR0", () => {
    render(<GameDetails {...gameDetailsMock} />);

    expect(screen.getByText(/free/i)).toBeInTheDocument();
  });

  it("should render 18+ rating when BR18", () => {
    render(<GameDetails {...gameDetailsMock} rating="BR18" />);

    expect(screen.getByText(/18\+/i)).toBeInTheDocument();
  });

  it("should render a list of genres", () => {
    render(
      <GameDetails {...gameDetailsMock} genre={["Role-playing", "Narrative"]} />
    );

    expect(screen.getByText(/role-playing\/narrative/i)).toBeInTheDocument();
  });
});
