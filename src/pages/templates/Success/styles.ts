import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.xxlarge} 0 calc(${theme.spacings.xxlarge} * 3);
  `}
`;

export const Heading = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.xxlarge};
    text-align: center;
  `}
`;

export const CheckMark = styled.div`
  ${({ theme }) => css`
    text-align: center;
    padding: ${theme.spacings.medium};
    position: relative;

    &::after,
    &::before {
      content: "";
      background: ${theme.colors.primary};
      display: block;
      position: absolute;
      width: 43%;
      height: 1px;
      top: 50%;
      transform: translateY(-50%);
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }

    ${media.lessThan("medium")`
      &::after,
      &::before {
        width: 30%;
    }
    `}

    svg {
      color: ${theme.colors.white};
      background: ${theme.colors.primary};
      border-radius: 50%;
      padding: 1rem;
      width: 7rem;
      position: relative;
    }
  `}
`;

export const Text = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.medium};
    text-align: center;
    max-width: 60rem;
    margin: auto;
    line-height: 1.5;

    a {
      color: ${theme.colors.primary};
      text-decoration: none;
    }
  `}
`;
