import { InMemoryCache } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";

export const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        games: concatPagination(["where", "sort"])
      }
    },
    Wishlist: {
      fields: {
        games: {
          merge(_, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});
