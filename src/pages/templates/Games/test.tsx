import { screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { exploreSidebarMock } from "components/ExploreSidebar/mock";
import { renderWithTheme } from "utils/tests/helpers";

import { Games } from ".";
import { fetchMoreMock, gamesMock } from "./mocks";
import userEvent from "@testing-library/user-event";
import { apolloCache } from "utils/apolloCache";

jest.mock("pages/templates/Base", () => ({
  __esModule: true,
  Base: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  }
}));

jest.mock("components/ExploreSidebar", () => {
  return {
    __esModule: true,
    ExploreSidebar: function Mock() {
      return <div data-testid="Mock ExploreSidebar"></div>;
    }
  };
});

describe("<Games />", () => {
  it("should render loading when starting template", () => {
    renderWithTheme(
      <MockedProvider mocks={[]} addTypename={false}>
        <Games filterItems={exploreSidebarMock} />
      </MockedProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should render sections", async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock]} addTypename={false}>
        <Games filterItems={exploreSidebarMock} />
      </MockedProvider>
    );

    // starts with loading
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // gets data
    expect(
      await screen.findByTestId("Mock ExploreSidebar")
    ).toBeInTheDocument();

    expect(await screen.findByText(/rimworld/i)).toBeInTheDocument();

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

    expect(await screen.findByText(/rimworld/i)).toBeInTheDocument();

    userEvent.click(await screen.findByRole("button", { name: /show more/i }));

    expect(await screen.findByText(/fetch more game/i)).toBeInTheDocument();
  });
});
