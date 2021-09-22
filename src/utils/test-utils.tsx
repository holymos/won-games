import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import {
  CartContext,
  CartContextData,
  CartContextDefaultValues
} from "contexts/cartContext";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";

type CustomRenderProps = {
  cartProviderProps?: CartContextData;
} & Omit<RenderOptions, "queries">;

function customRender(
  ui: ReactElement,
  {
    cartProviderProps = CartContextDefaultValues,
    ...renderOptions
  }: CustomRenderProps = {}
) {
  return render(
    <ThemeProvider theme={theme}>
      <CartContext.Provider value={cartProviderProps}>
        {ui}
      </CartContext.Provider>
    </ThemeProvider>,
    renderOptions
  );
}

export * from "@testing-library/react";
export { customRender as render };
