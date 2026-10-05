import styled from 'styled-components';

const StyledBookingsPreview = styled.div`
  background-color: var(--color-primary-tint-950);
  box-shadow: var(--shadow-md);
`;

function WeekPreview() {
  return <StyledBookingsPreview>Bookings</StyledBookingsPreview>;
}

export default WeekPreview;
