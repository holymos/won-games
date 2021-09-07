import { Story, Meta } from "@storybook/react";
import { GameDetails, GameDetailsProps } from ".";
import { gameDetailsMock } from "./mock";

export default {
  title: "Game/GameDetails",
  component: GameDetails,
  parameters: {
    backgrounds: {
      default: "won-dark"
    }
  },
  args: gameDetailsMock,
  argTypes: {
    releaseDate: {
      control: {
        type: "date"
      }
    },
    platforms: {
      control: {
        type: "inline-check",
        options: ["linux", "windows", "mac"]
      }
    },
    genre: {
      control: {
        type: "inline-check",
        options: ["Role-playing", "Narrative"]
      }
    }
  }
} as Meta;

export const Default: Story<GameDetailsProps> = (args) => (
  <div style={{ maxWidth: "130rem", margin: "0 auto" }}>
    <GameDetails {...args} />
  </div>
);
