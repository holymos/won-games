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

    ${Content} {
      transition: transform 0.2s ease-out, opacity ${theme.transition.default};
      ${isOpen && wrapperModifiers.open()}
      ${!isOpen && wrapperModifiers.closed()}
    }
  `}
`;
