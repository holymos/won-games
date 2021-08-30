import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  MouseEvent,
  ReactNode
} from "react";
import * as S from "./styles";

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  children?: ReactNode;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  icon?: ReactNode;
  minimal?: boolean;
  as?: ElementType;
  onClick?: () => (event: MouseEvent<HTMLButtonElement>) => void;
} & ButtonTypes;

export function Button({
  children,
  size = "medium",
  fullWidth = false,
  icon,
  minimal = false,
  ...props
}: ButtonProps) {
  return (
    <S.Wrapper
      size={size}
      fullWidth={fullWidth}
      hasIcon={!!icon}
      minimal={minimal}
      {...props}
    >
      {!!icon && icon}
      {!!children && <span>{children}</span>}
    </S.Wrapper>
  );
}
