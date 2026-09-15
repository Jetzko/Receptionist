import styled from 'styled-components';

const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

const Image = styled.img`
  height: 6.4rem;
  width: auto;
`;

const Title = styled.strong`
  font-family: 'Playfair Display SC', serif;
  font-weight: 900;
  font-style: normal;
  font-size: 1.6rem;
  color: var(--color-indigo-400);
  letter-spacing: 0.2rem;
`;

function Logo() {
  return (
    <StyledLogo>
      <Image src='../../public/icons8-campanella-di-servizio-64.png' />
      <Title>RECEPTIONIST</Title>
    </StyledLogo>
  );
}

export default Logo;
