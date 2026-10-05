import styled, { css } from 'styled-components';

const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: var(--font-size-3);
      font-weight: var(--font-weight-heavy);
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: var(--font-size-1);
      font-weight: var(--font-weight-heavy);
    `}

    ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: var(--font-size-1);
      font-weight: var(--font-weight-medium);
    `}

    ${(props) =>
    props.as === 'h4' &&
    css`
      font-size: var(--font-size-3);
      font-weight: var(--font-weight-heavy);
      text-align: center;
    `}

    line-height: var(--font-size-m1);
`;

export default Heading;
