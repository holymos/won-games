import { render, screen } from "utils/test-utils";

import { Auth } from ".";

describe("<Auth />", () => {
  it("should render logos, title and children", () => {
    render(
      <Auth title="Auth title">
        <input type="text" />
      </Auth>
    );

    // verificar se existem 2 logos
    expect(screen.getAllByRole("img", { name: /won games/i })).toHaveLength(2);

    // verificar se o heading principal e o subtitle estão presentes
    expect(
      screen.getByRole("heading", {
        name: /All your favorite games in one place/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /won is the best and most complete gaming platform./i
      })
    ).toBeInTheDocument();

    // verificar se o heading da seção "Content" está presente
    expect(
      screen.getByRole("heading", { name: /auth title/i })
    ).toBeInTheDocument();

    // verificar se o children está presente
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
