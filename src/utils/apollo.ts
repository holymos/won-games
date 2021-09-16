import { ApolloClient, HttpLink, NormalizedCacheObject } from "@apollo/client";

import { useMemo } from "react";
import { apolloCache } from "./apolloCache";

let apolloClient: ApolloClient<NormalizedCacheObject | null>;

function createApolloCliente() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:1337/graphql"
    }),
    cache: apolloCache
  });
}

export function initializeApollo(initialState = null) {
  //verificar se já existe uma instância para não criar outra
  const apolloClientGlobal = apolloClient ?? createApolloCliente();

  // recupera dados de cache
  if (initialState) {
    apolloClientGlobal.cache.restore(initialState);
  }

  // sempre inicializa no ssr com cache limpo
  if (typeof window === "undefined") return apolloClientGlobal;
  apolloClient = apolloClient ?? apolloClientGlobal;

  return apolloClient;
}

export function useApollo(initialState = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
}
