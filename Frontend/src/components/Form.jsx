import styled, { css } from 'styled-components';

const Form = styled.form`
  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;
      width: var(--space-12);

      /* Box */
      background-color: #fff;
      border: 1px solid var(--color-primary-tint-900);
      border-radius: var(--border-radius-md);
      box-shadow: 5px 5px 5px var(--color-primary-tint-800);
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: 'reguar',
};

export default Form;
