import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloCliente() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:1337/graphql"
    }),
    cache: new InMemoryCache()
  });
}

export function initializeApollo(initialState = {}) {
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

export function useApollo(initialState = {}) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
}
