import styled, { css } from "styled-components";

export const Title = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    position: relative;
    color: ${theme.colors.white};
    display: flex;
    align-items: center;
    padding-right: 2.4rem;
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    margin-top: ${theme.spacings.small};
    position: absolute;
    right: 0;
    z-index: ${theme.layers.alwaysOnTop};

    &::before {
      content: "";
      position: absolute;
      border-right: 1rem solid transparent;
      border-left: 1rem solid transparent;
      border-bottom: 1rem solid ${theme.colors.white};
      top: -1rem;
      right: 2.4rem;
    }
  `}
`;

export const Overlay = styled.div`
  ${({ theme }) => css`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${theme.layers.overlay};
    cursor: auto;
  `}
`;

type WrapperProps = {
  isOpen: boolean;
};

const wrapperModifiers = {
  open: () => css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  closed: () => css`
    opacity: 0;
    pointer-events: none;
    transform: translateY(-1rem);
  `
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, isOpen }) => css`
    position: relative;
    width: max-content;

    ${Content},
    ${Overlay} {
      transition: transform 0.2s ease-out, opacity ${theme.transition.default};
      ${isOpen && wrapperModifiers.open()}
      ${!isOpen && wrapperModifiers.closed()}
    }
  `}
`;
