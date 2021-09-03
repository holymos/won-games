import { ReactNode } from "react";
import * as S from "./styles";

export type LineColors = "primary" | "secondary";

export type HeadingProps = {
  children: ReactNode;
  color?: "white" | "black";
  lineLeft?: boolean;
  lineBottom?: boolean;
  lineColor?: LineColors;
  size?: "small" | "medium" | "huge";
};

export function Heading({
  children,
  color = "white",
  lineLeft = false,
  lineBottom = false,
  size = "medium",
  lineColor = "primary"
}: HeadingProps) {
  return (
    <S.Wrapper
      color={color}
      lineLeft={lineLeft}
      lineBottom={lineBottom}
      size={size}
      lineColor={lineColor}
    >
      {children}
    </S.Wrapper>
  );
}
