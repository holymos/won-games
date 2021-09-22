import {
  QueryGameBySlug,
  QueryGameBySlugVariables
} from "graphql/generated/QueryGameBySlug";
import { QueryGames, QueryGamesVariables } from "graphql/generated/QueryGames";
import { QueryRecommended } from "graphql/generated/QueryRecommended";
import {
  QueryUpcoming,
  QueryUpcomingVariables
} from "graphql/generated/QueryUpcoming";
import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from "graphql/queries/games";
import { QUERY_RECOMMENDED } from "graphql/queries/recommended";
import { QUERY_UPCOMING } from "graphql/queries/upcoming";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Game, GameTemplateProps } from "pages/templates/Game";
import { initializeApollo } from "utils/apollo";
import { gamesMapper, highlightMapper } from "utils/mappers";

const apolloClient = initializeApollo();

export default function GamePage(props: GameTemplateProps) {
  const router = useRouter();

  if (router.isFallback) return null;

  return <Game {...props} />;
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 9 }
  });

  const paths = data.games.map(({ slug }) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: true
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // get game data
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({ query: QUERY_GAME_BY_SLUG, variables: { slug: `${params?.slug}` } });

  if (!data.games.length) {
    return { notFound: true };
  }

  const game = data.games[0];

  // get recommended games
  const { data: recommended } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  });

  // get upcoming games and highlight
  const TODAY = new Date().toISOString().slice(0, 10);

  const { data: upcoming } = await apolloClient.query<
    QueryUpcoming,
    QueryUpcomingVariables
  >({
    query: QUERY_UPCOMING,
    variables: {
      date: TODAY
    }
  });

  return {
    revalidate: 60,
    props: {
      cover: `http://localhost:1337${game.cover?.src}`,
      gameInfo: {
        id: game.id,
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery.map((image) => ({
        src: `http://localhost:1337${image.src}`,
        label: image.label
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genre: game.categories.map((category) => category.name)
      },
      upcomingTitle: upcoming.showcase?.upcomingGames?.title,
      upcomingGames: gamesMapper(upcoming.upcomingGames),
      upcomingHighlight: highlightMapper(
        upcoming.showcase?.upcomingGames?.highlight
      ),
      recommendedTitle: recommended.recommendedGame?.group?.title,
      recommendedGames: gamesMapper(recommended.recommendedGame?.group?.games)
    }
  };
};
