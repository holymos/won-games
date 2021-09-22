import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import Head from "next/head";
import { CartContextProvider } from "contexts/cartContext";
import { ThemeProvider } from "styled-components";

import { useApollo } from "utils/apollo";

import GlobalStyles from "styles/global";
import theme from "styles/theme";

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <CartContextProvider>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Won Games</title>
            <link rel="shortcut icon" href="/img/icon-512.png" />
            <link rel="apple-touch-icon" href="/img/icon-512.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#06092B" />
            <meta name="description" content="A Game Store to rule them all" />
          </Head>
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </CartContextProvider>
    </ApolloProvider>
  );
}

export default App;
