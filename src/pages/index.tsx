import { Home, HomeTemplateProps } from "pages/templates/Home";

import { items as bannersMock } from "components/BannerSlider/mock";
import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />;
}

export function getServerSideProps() {
  return {
    props: {
      banners: bannersMock,
      newGames: gamesMock,
      mostPopularHighlight: highlightMock,
      mostPopularGames: gamesMock,
      upcomingGames: gamesMock,
      upcomingHighlight: highlightMock,
      upcomingMoreGames: gamesMock,
      freeGamesHighlight: highlightMock,
      freeGames: gamesMock
    }
  };
}
