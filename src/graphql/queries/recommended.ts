import gql from "graphql-tag";

import { GameFragment } from "graphql/fragments/game";
import { HighlightFragment } from "graphql/fragments/highlight";

export const QUERY_RECOMMENDED = gql`
  query QueryRecommended {
    recommendedGame {
      group {
        title
        highlight {
          ...HighlightFragment
        }
        games {
          ...GameFragment
        }
      }
    }
  }

  ${HighlightFragment}
  ${GameFragment}
`;
