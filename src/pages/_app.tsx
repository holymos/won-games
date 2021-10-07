import { ApolloProvider } from "@apollo/client";
import { Provider as AuthProvider } from "next-auth/client";
import { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";

import { CartContextProvider } from "contexts/cartContext";
import { useApollo } from "utils/apollo";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "styles/global";
import theme from "styles/theme";
import { WishlistContextProvider } from "contexts/wishlistContext";

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <AuthProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <WishlistContextProvider>
          <CartContextProvider>
            <ThemeProvider theme={theme}>
              <Head>
                <title>Won Games</title>
                <link rel="shortcut icon" href="/img/icon-512.png" />
                <link rel="apple-touch-icon" href="/img/icon-512.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#06092B" />
                <meta
                  name="description"
                  content="A Game Store to rule them all"
                />
              </Head>
              <DefaultSeo {...SEO} />
              <GlobalStyles />
              <NextNProgress
                color="#F231A5"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
              />
              <Component {...pageProps} />
            </ThemeProvider>
          </CartContextProvider>
        </WishlistContextProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
