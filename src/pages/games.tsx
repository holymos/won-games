import { exploreSidebarMock } from "components/ExploreSidebar/mock";
import { gamesMock } from "components/GameCardSlider/mock";
import { Games, GamesTemplateProps } from "./templates/Games";

export default function GamesPage(props: GamesTemplateProps) {
  return <Games {...props} />;
}

export async function getServerSideProps() {
  return {
    props: {
      games: gamesMock,
      filterItems: exploreSidebarMock
    }
  };
}
