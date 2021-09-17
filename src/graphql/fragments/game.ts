import gql from "graphql-tag";

export const GameFragment = gql`
  fragment GameFragment on Game {
    id
    name
    slug
    cover {
      url
    }
    developers {
      name
    }
    price
  }
`;
