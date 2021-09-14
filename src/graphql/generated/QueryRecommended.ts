/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_COMPONENTPAGEHIGHLIGHT_ALIGNMENT } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryRecommended
// ====================================================

export interface QueryRecommended_recommendedGame_group_highlight_background {
  __typename: "UploadFile";
  url: string;
}

export interface QueryRecommended_recommendedGame_group_highlight_floatImage {
  __typename: "UploadFile";
  url: string;
}

export interface QueryRecommended_recommendedGame_group_highlight {
  __typename: "ComponentPageHighlight";
  title: string;
  subtitle: string;
  background: QueryRecommended_recommendedGame_group_highlight_background | null;
  floatImage: QueryRecommended_recommendedGame_group_highlight_floatImage | null;
  buttonLabel: string;
  buttonLink: string;
  alignment: ENUM_COMPONENTPAGEHIGHLIGHT_ALIGNMENT | null;
}

export interface QueryRecommended_recommendedGame_group_games_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryRecommended_recommendedGame_group_games_developers {
  __typename: "Developer";
  name: string;
}

export interface QueryRecommended_recommendedGame_group_games {
  __typename: "Game";
  name: string;
  slug: string;
  cover: QueryRecommended_recommendedGame_group_games_cover | null;
  developers: QueryRecommended_recommendedGame_group_games_developers[];
  price: number;
}

export interface QueryRecommended_recommendedGame_group {
  __typename: "ComponentPagePopularGames";
  title: string;
  highlight: QueryRecommended_recommendedGame_group_highlight | null;
  games: QueryRecommended_recommendedGame_group_games[];
}

export interface QueryRecommended_recommendedGame {
  __typename: "RecommendedGames";
  group: QueryRecommended_recommendedGame_group | null;
}

export interface QueryRecommended {
  recommendedGame: QueryRecommended_recommendedGame | null;
}
