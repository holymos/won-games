import { Container } from "components/Container";
import { Divider } from "components/Divider";
import { Empty } from "components/Empty";
import { GameCard, GameCardProps } from "components/GameCard";
import { Grid } from "components/Grid";
import { Heading } from "components/Heading";
import { HighlightProps } from "components/Highlight";
import { Loader } from "components/Loader";
import { Showcase } from "components/Showcase";
import { useWishlist } from "hooks/useWishlist";
import { Base } from "../Base";

import * as S from "./styles";

export type WishlistTemplateProps = {
  recommendedGames: GameCardProps[];
  recommendedHighlight: HighlightProps;
  recommendedTitle?: string;
};

export function Wishlist({
  recommendedGames,
  recommendedHighlight,
  recommendedTitle = "You may like these games"
}: WishlistTemplateProps) {
  const { items, loading } = useWishlist();

  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          Wishlist
        </Heading>

        {loading ? (
          <S.Loading>
            <Loader />
          </S.Loading>
        ) : items?.length >= 1 ? (
          <Grid>
            {items?.map((game, index) => (
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
