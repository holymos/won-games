import { Container } from "components/Container";
import { Divider } from "components/Divider";
import { Empty } from "components/Empty";
import { GameCard, GameCardProps } from "components/GameCard";
import { Grid } from "components/Grid";
import { Heading } from "components/Heading";
import { HighlightProps } from "components/Highlight";
import { Showcase } from "components/Showcase";
import { Base } from "../Base";

export type WishlistTemplateProps = {
  games?: GameCardProps[];
  recommendedGames: GameCardProps[];
  recommendedHighlight: HighlightProps;
  recommendedTitle?: string;
};

export function Wishlist({
  games = [],
  recommendedGames,
  recommendedHighlight,
  recommendedTitle = "You may like these games"
}: WishlistTemplateProps) {
  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          Wishlist
        </Heading>

        {games?.length ? (
          <Grid>
            {games?.map((game, index) => (
              <GameCard key={index} {...game} />
            ))}
          </Grid>
        ) : (
          <Empty
            title="Your wishlist is empty"
            description="Games added to your wihslist will appear here"
            hasLink
          />
        )}

        <Divider />
      </Container>

      <Showcase
        title={recommendedTitle}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  );
}
