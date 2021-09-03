import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  forwardRef,
  ForwardRefRenderFunction,
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

const ButtonComponent: ForwardRefRenderFunction<S.WrapperProps, ButtonProps> = (
  {
    children,
    size = "medium",
    fullWidth = false,
    icon,
    minimal = false,
    ...props
  },
  ref
) => {
  return (
    <S.Wrapper
      size={size}
      fullWidth={fullWidth}
      hasIcon={!!icon}
      minimal={minimal}
      ref={ref}
      {...props}
    >
      {!!icon && icon}
      {!!children && <span>{children}</span>}
    </S.Wrapper>
  );
};

export const Button = forwardRef(ButtonComponent);
