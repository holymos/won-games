import { screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { exploreSidebarMock } from "components/ExploreSidebar/mock";
import { renderWithTheme } from "utils/tests/helpers";

import { Games } from ".";
import { fetchMoreMock, gamesMock, noGamesMock } from "./mocks";
import userEvent from "@testing-library/user-event";
import { apolloCache } from "utils/apolloCache";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require("next/router"), "useRouter");
const push = jest.fn();

useRouter.mockImplementation(() => ({
  push,
  query: "",
  asPath: "",
  route: "/"
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  }
}));

jest.mock("pages/templates/Base", () => ({
  __esModule: true,
  Base: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  }
}));

describe("<Games />", () => {
  it("should render sections", async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock]} addTypename={false}>
        <Games filterItems={exploreSidebarMock} />
      </MockedProvider>
    );

    // gets data
    expect(await screen.findByText(/price/i)).toBeInTheDocument();

    expect(await screen.findByText(/sample game/i)).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: /show more/i })
    ).toBeInTheDocument();
  });

  it("should render more games when show more is clicked", async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock, fetchMoreMock]} cache={apolloCache}>
        <Games filterItems={exploreSidebarMock} />
      </MockedProvider>
    );

    expect(await screen.findByText(/sample game/i)).toBeInTheDocument();

    userEvent.click(await screen.findByRole("button", { name: /show more/i }));

    expect(await screen.findByText(/fetch more game/i)).toBeInTheDocument();
  });

  it("should change push router when selecting a filter", async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock, fetchMoreMock]} cache={apolloCache}>
        <Games filterItems={exploreSidebarMock} />
      </MockedProvider>
    );

    userEvent.click(await screen.findByRole("checkbox", { name: /windows/i }));
    userEvent.click(await screen.findByRole("checkbox", { name: /linux/i }));
    userEvent.click(await screen.findByLabelText(/low to high/i));

    expect(push).toHaveBeenCalledWith({
      pathname: "/games",
      query: { platforms: ["windows", "linux"], sort_by: "low-to-high" }
    });
  });

  it("should render empty when no games are found", async () => {
    renderWithTheme(
      <MockedProvider mocks={[noGamesMock]} addTypename={false}>
        <Games filterItems={exploreSidebarMock} />
      </MockedProvider>
    );

    expect(
      await screen.findByText(/no games were found with this filter/i)
    ).toBeInTheDocument();
  });
});
