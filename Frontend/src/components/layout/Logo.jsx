import styled from 'styled-components';

const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: auto var(--padding-md);
`;

const Image = styled.img`
  height: var(--space-7);
`;

const Title = styled.strong`
  font-family: 'Playfair Display SC', serif;
  font-weight: var(--font-weight-hero);
  font-style: normal;
  color: var(--color-tertiary-base);
  letter-spacing: 0.2rem;
`;

function Logo() {
  return (
    <StyledLogo>
      <Image src='./icons8-campanella-di-servizio-64.png' />
      <Title>RECEPTIONIST</Title>
    </StyledLogo>
  );
}

export default Logo;
