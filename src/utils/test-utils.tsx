import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import {
  CartContext,
  CartContextData,
  CartContextDefaultValues
} from "contexts/cartContext";
import {
  WishlistContext,
  WishlistContextData,
  WishlistContextDefaultValues
} from "contexts/wishlistContext";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";

type CustomRenderProps = {
  cartProviderProps?: CartContextData;
  wishlistProviderProps?: WishlistContextData;
} & Omit<RenderOptions, "queries">;

function customRender(
  ui: ReactElement,
  {
    cartProviderProps = CartContextDefaultValues,
    wishlistProviderProps = WishlistContextDefaultValues,
    ...renderOptions
  }: CustomRenderProps = {}
) {
  return render(
    <ThemeProvider theme={theme}>
      <CartContext.Provider value={cartProviderProps}>
        <WishlistContext.Provider value={wishlistProviderProps}>
          {ui}
        </WishlistContext.Provider>
      </CartContext.Provider>
    </ThemeProvider>,
    renderOptions
  );
}

export * from "@testing-library/react";
export { customRender as render };
