import styled from 'styled-components';

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: var(--padding-xsm);
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover,
  &:active,
  &:focus {
    background-color: var(--color-primary-tint-850);
  }

  & svg {
    width: var(--space-5);
    color: var(--color-primary-shade-50);
  }

  & svg:hover,
  & svg:active,
  & svg:focus {
    color: var(--color-primary-shade-350);
  }
`;

export default ButtonIcon;
