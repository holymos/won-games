import { render } from "utils/test-utils";

import theme from "styles/theme";
import { Container } from ".";

describe("<Container />", () => {
  it("should render the container", () => {
    const { container } = render(<Container />);

    expect(container.firstChild).toHaveStyleRule(
      "max-width",
      theme.grid.container
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
.c0 {
  max-width: 130rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: calc(3.2rem / 2);
  padding-right: calc(3.2rem / 2);
}

<div
  class="c0"
/>
`);
  });
});
