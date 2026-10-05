import styled from 'styled-components';
import {
  HiCalendarDateRange,
  HiChatBubbleBottomCenterText,
} from 'react-icons/hi2';

import { PiAirplaneLanding, PiAirplaneTakeoff } from 'react-icons/pi';

const StyledOverview = styled.ul`
  /* background-color: var(--color-primary-tint-950);
  box-shadow: var(--shadow-md); */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const StyledNotification = styled.li`
  margin: 0 var(--space-3);
  padding: var(--padding-sm);
  display: flex;
  background-color: var(--color-primary-tint-950);
  box-shadow: var(--shadow-md);
  justify-content: space-around;
  align-items: center;

  & svg {
    width: var(--space-5);
    height: var(--space-5);
    color: var(--color-primary-shade-350);
    transition: all 0.3s;
  }
`;

const Icon = styled.div`
  background-color: var(--color-secondary-base);
  padding: var(--padding-xsm) var(--padding-half-sm);
  border-radius: 100%;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & span {
    font-size: var(--font-size-2);
    color: var(--color-tertiary-base);
  }
`;

function Overview() {
  return (
    <StyledOverview>
      <StyledNotification>
        <Icon>
          <HiCalendarDateRange />
        </Icon>
        <Text>
          <h5>Bookings</h5>
          <span>3</span>
        </Text>
      </StyledNotification>
      <StyledNotification>
        <Icon>
          <PiAirplaneLanding />
        </Icon>
        <Text>
          <h5>Check-ins</h5>
          <span>2</span>
        </Text>
      </StyledNotification>
      <StyledNotification>
        <Icon>
          <PiAirplaneTakeoff />
        </Icon>
        <Text>
          <h5>Check-outs</h5>
          <span>1</span>
        </Text>
      </StyledNotification>
      <StyledNotification>
        <Icon>
          <HiChatBubbleBottomCenterText />
        </Icon>
        <Text>
          <h5>Reviews</h5>
          <span>3</span>
        </Text>
      </StyledNotification>
    </StyledOverview>
  );
}

export default Overview;
