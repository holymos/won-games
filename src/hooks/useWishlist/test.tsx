import { ReactNode } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { MockedProvider } from "@apollo/client/testing";
import { useWishlist } from ".";
import { WishlistContextProvider } from "contexts/wishlistContext";
import {
  createWishlistMock,
  removeWishlistMock,
  updateWishlistMock,
  wishlistItems,
  wishlistMock
} from "./mock";
import { act } from "react-dom/test-utils";
import { waitFor } from "utils/test-utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useSession = jest.spyOn(require("next-auth/client"), "useSession");
const session = { jwt: "123", user: { email: "lorem@ipsum.com" } };
useSession.mockImplementation(() => [session]);

describe("useWishlist", () => {
  it("should return wishlist items", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockedProvider mocks={[wishlistMock]}>
        <WishlistContextProvider>{children}</WishlistContextProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    });

    // starts loading data
    expect(result.current.loading).toBe(true);

    // wait until the data arrives
    await waitForNextUpdate();

    expect(result.current.items).toStrictEqual([
      wishlistItems[0],
      wishlistItems[1]
    ]);
  });

  it("should check if item is already in wishlist", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockedProvider mocks={[wishlistMock]}>
        <WishlistContextProvider>{children}</WishlistContextProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    });

    // wait until the data arrives
    await waitForNextUpdate();

    expect(result.current.isInWishlist("1")).toBe(true);
    expect(result.current.isInWishlist("2")).toBe(true);
    expect(result.current.isInWishlist("3")).toBe(false);
  });

  it("should add an item to the wishlist creating a new list", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockedProvider mocks={[createWishlistMock]}>
        <WishlistContextProvider>{children}</WishlistContextProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    });

    act(() => {
      result.current.addToWishlist("3");
    });

    await waitForNextUpdate();
    await waitFor(() =>
      expect(result.current.items).toStrictEqual([wishlistItems[2]])
    );
  });

  it("should add an item to the wishlist updating the current list", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockedProvider mocks={[wishlistMock, updateWishlistMock]}>
        <WishlistContextProvider>{children}</WishlistContextProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    });

    // wait for the data to load
    await waitForNextUpdate();

    act(() => {
      result.current.addToWishlist("3");
    });

    await waitFor(() => {
      expect(result.current.items).toStrictEqual(wishlistItems);
    });
  });

  it("should remove an item from the wishlist", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockedProvider mocks={[wishlistMock, removeWishlistMock]}>
        <WishlistContextProvider>{children}</WishlistContextProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    });

    // wait for the data to load
    await waitForNextUpdate();

    act(() => {
      result.current.removeFromWishlist("1");
    });

    await waitFor(() => {
      expect(result.current.items).toStrictEqual([wishlistItems[1]]);
    });
  });
});
