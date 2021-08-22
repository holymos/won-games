import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { Banner } from ".";

const props = {
  img: "https://source.unsplash.com/user/willianjusten/1042x580",
  title: "Defy death",
  subtitle: "<p>Play the new <strong>CrashLands</strong> season",
  buttonLabel: "Buy now",
  buttonLink: "/games/defy-death"
};

describe("<Banner />", () => {
  it("should render the component correctly", () => {
    const { container } = renderWithTheme(<Banner {...props} />);

    expect(
      screen.getByRole("heading", { name: /defy death/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /play the new crashlands season/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /defy death/i }));

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render a ribbon", () => {
    renderWithTheme(
      <Banner
        {...props}
        ribbon="My Ribbon"
        ribbonSize="normal"
        ribbonColor="primary"
      />
    );

    const ribbon = screen.getByText(/my ribbon/i);

    expect(ribbon).toBeInTheDocument();
    expect(ribbon).toHaveStyle({
      backgroundColor: "#F231A5",
      height: "3.6rem",
      fontSize: "1.4rem"
    });
  });
});
