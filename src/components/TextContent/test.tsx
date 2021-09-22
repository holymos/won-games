import { render, screen } from "utils/test-utils";

import { TextContent } from ".";
import { textContentMock } from "./mock";

describe("<TextContent />", () => {
  it("should render title and content", () => {
    render(
      <TextContent
        title={textContentMock.title}
        content={textContentMock.content.slice(0, 17)}
      />
    );

    expect(
      screen.getByRole("heading", { name: /description/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /heading/i })
    ).toBeInTheDocument();
  });

  it("should render without title", () => {
    render(<TextContent content={`<h1>Content</h1>`} />);

    expect(
      screen.queryByRole("heading", { name: /title/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /content/i })
    ).toBeInTheDocument();
  });

  it("should render color white on mobile and black on desktop", () => {
    render(<TextContent title="Title" content={`<h1>Content</h1>`} />);

    const wrapper = screen.getByRole("heading", {
      name: /title/i
    }).parentElement;

    expect(wrapper).toHaveStyle({
      color: "#FAFAFA"
    });

    expect(wrapper).toHaveStyleRule("color", "#030517", {
      media: "(min-width: 768px)"
    });
  });
});
