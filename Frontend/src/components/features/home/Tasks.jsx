import styled from 'styled-components';

const StyledTasks = styled.div`
  background-color: var(--color-primary-tint-950);
  box-shadow: var(--shadow-md);
`;

function Tasks() {
  return <StyledTasks>Tasks</StyledTasks>;
}

export default Tasks;
