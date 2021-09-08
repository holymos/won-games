import { galleryMock } from "components/Gallery/mock";
import { gamesMock } from "components/GameCardSlider/mock";
import { highlightMock } from "components/Highlight/mock";
import { Game, GameTemplateProps } from "pages/templates/Game";

export default function GamePage(props: GameTemplateProps) {
  return <Game {...props} />;
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "cyberpunk-2077" } }],
    fallback: false
  };
}

export async function getStaticProps() {
  const descriptionHTML = `
    <img src="https://items.gog.com/not_a_cp/ENG_product-page-addons-2020_yellow_on_black.png">
    <p>* Exclusive Digital Comic - Cyberpunk 2077: Big City Dreams will be available in English only.
    <hr><p class="module">Korean Voiceover will be added on 11th December 2020.</p><img alt="" src="https://items.gog.com/not_a_cp/EN/EN-About-the-Game.png"><p><b>Cyberpunk 2077</b> is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.</p
    <img alt="" src="https://items.gog.com/not_a_cp/EN/EN-Mercenary-Outlaw.png">
    <p>Become a cyberpunk, an urban mercenary equipped with cybernetic enhancements and build your legend on the streets of Night City.</p><img alt="" src="https://items.gog.com/not_a_cp/EN/EN-City-of-the-Future.png"><p>Enter the massive open world of Night City, a place that sets new standards in terms of visuals, complexity and depth.</p><img alt="" src="https://items.gog.com/not_a_cp/EN/EN-Eternal-Life.png">
    <p>Take the riskiest job of your life and go after a prototype implant that is the key to immortality.</p>

    <p class="description__copyrights">
    CD PROJEKT®, Cyberpunk®, Cyberpunk 2077® are registered trademarks of CD PROJEKT S.A. © 2019
    CD PROJEKT S.A. All rights reserved. All other copyrights and trademarks are the property of their
    respective owners.
  </p>`;

  return {
    props: {
      cover:
        "https://images.gog-statics.com/5643a7c831df452d29005caeca24c28cdbfaa6fbea5a9556b147ee26d325fa70_bg_crop_1366x655.jpg",
      gameInfo: {
        title: "Cyberpunk 2077",
        price: "59.00",
        description:
          "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw after a one-of-a-kind implant that is the key to immortality."
      },
      gallery: galleryMock,
      description: descriptionHTML,
      details: {
        developer: "CD Projekt Red",
        releaseDate: "2020-12-10T23:00:00",
        platforms: ["windows"],
        publisher: "CD Projekt Red",
        rating: "BR18",
        genre: ["Action", "Role-playing"]
      },
      upcomingGames: gamesMock,
      upcomingHighlight: highlightMock,
      recommendedGames: gamesMock
    }
  };
}
