import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  inset: 0;
  z-index: 10;
  /* transform: translate(-50% -50%); */
  background-color: var(--backdrop-color-light);
  backdrop-filter: blur(5px);
`;

function Modal({ children }) {
  return <StyledModal>{children}</StyledModal>;
}

export default Modal;
