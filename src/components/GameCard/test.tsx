import "session.mock";
import { render, screen } from "utils/test-utils";

import { GameCard } from ".";

const props = {
  id: "1",
  slug: "population-zero",
  title: "Population Zero",
  developer: "Rockstar Games",
  img: "https://source.unsplash.com/user/willianjusten/1042x580",
  price: "$235.00"
};

describe("<GameCard />", () => {
  it("should render correctly", () => {
    const { container } = render(<GameCard {...props} />);

    expect(
      screen.getByRole("heading", { name: props.title })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: props.developer })
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: props.title })).toBeInTheDocument();

    expect(screen.getByText("$235.00")).toBeInTheDocument();

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: props.title })).toHaveAttribute(
      "href",
      `/game/${props.slug}`
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render price in label", () => {
    render(<GameCard {...props} />);

    const price = screen.getByText("$235.00");

    expect(price).not.toHaveStyle({
      textDecoration: "line-through"
    });

    expect(price).toHaveStyle({
      backgroundColor: "#3CD3C1"
    });
  });

  it("should render a line-through in price when there is promotion", () => {
    render(<GameCard {...props} promotionalPrice={"$15.00"} />);

    expect(screen.getByText("$235.00")).toHaveStyle({
      textDecoration: "line-through"
    });

    expect(screen.getByText("$15.00")).not.toHaveStyle({
      textDecoration: "line-through"
    });
  });

  it("should render outlined icon by default", () => {
    render(<GameCard {...props} />);

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument();
  });

  it("should render a ribbon", () => {
    render(
      <GameCard
        {...props}
        ribbon="My Ribbon"
        ribbonSize="small"
        ribbonColor="secondary"
      />
    );

    const ribbon = screen.getByText(/my ribbon/i);

    expect(ribbon).toBeInTheDocument();
    expect(ribbon).toHaveStyle({
      backgroundColor: "#3CD3C1"
    });
    expect(ribbon).toHaveStyle({
      height: "2.6rem",
      fontSize: "1.2rem"
    });
  });
});
