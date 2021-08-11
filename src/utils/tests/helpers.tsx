import { ThemeProvider } from "styled-components";
import { render, RenderResult } from "@testing-library/react";

import theme from "styles/theme";
import { ReactNode } from "hoist-non-react-statics/node_modules/@types/react";

export function renderWithTheme(children: ReactNode): RenderResult {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
}
