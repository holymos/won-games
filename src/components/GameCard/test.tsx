import { fireEvent, screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { GameCard } from ".";

const props = {
  slug: "population-zero",
  title: "Population Zero",
  developer: "Rockstar Games",
  img: "https://source.unsplash.com/user/willianjusten/1042x580",
  price: 235.0
};

describe("<GameCard />", () => {
  it("should render correctly", () => {
    const { container } = renderWithTheme(<GameCard {...props} />);

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
    renderWithTheme(<GameCard {...props} />);

    const price = screen.getByText("$235.00");

    expect(price).not.toHaveStyle({
      textDecoration: "line-through"
    });

    expect(price).toHaveStyle({
      backgroundColor: "#3CD3C1"
    });
  });

  it("should render a line-through in price when there is promotion", () => {
    renderWithTheme(<GameCard {...props} promotionalPrice={15} />);

    expect(screen.getByText("$235.00")).toHaveStyle({
      textDecoration: "line-through"
    });

    expect(screen.getByText("$15.00")).not.toHaveStyle({
      textDecoration: "line-through"
    });
  });

  it("should render outlined icon by default", () => {
    renderWithTheme(<GameCard {...props} />);

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument();
  });

  it("should render filled icon is favorite is true", () => {
    renderWithTheme(<GameCard {...props} favorite />);

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument();
  });

  it("should call onFav method when favorite is clicked", () => {
    const onFav = jest.fn();

    renderWithTheme(<GameCard {...props} onFav={onFav} />);

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(onFav).toBeCalled();
  });

  it("should render a ribbon", () => {
    renderWithTheme(
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
