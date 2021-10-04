import { QueryRecommended } from "graphql/generated/QueryRecommended";
import { QUERY_RECOMMENDED } from "graphql/queries/recommended";
import { initializeApollo } from "utils/apollo";
import { gamesMapper, highlightMapper } from "utils/mappers";
import { Success, SuccessTemplateProps } from "./templates/Success";

export default function SuccessPage(props: SuccessTemplateProps) {
  return <Success {...props} />;
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  });

  return {
    revalidate: 60 * 60,
    props: {
      recommendedTitle: data.recommendedGame?.group?.title,
      recommendedGames: gamesMapper(data.recommendedGame?.group?.games),
      recommendedHighlight: highlightMapper(
        data.recommendedGame?.group?.highlight
      )
    }
  };
}
