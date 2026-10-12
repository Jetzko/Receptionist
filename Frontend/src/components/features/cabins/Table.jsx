import { createContext, useContext } from 'react';
import styled from 'styled-components';

const StyledTable = styled.div`
  border: 1px solid var(--color-primary-tint-500);
  font-size: var(--font-size-m1);
  background-color: var(--color-primary-tint-950);
  border-radius: var(--border-radius-md);
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: var(--space-5);
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-primary-tint-950);
  border-bottom: 1px solid var(--color-primary-tint-500);
  text-transform: uppercase;
  letter-spacing: var(--space-1);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-shade-100);
`;

const StyledRow = styled(CommonRow)`
  padding: var(--space-4) var(--space-5);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-primary-tint-500);
  }
`;

const StyledBody = styled.section`
  margin: var(--space-1) 0;
  /* max-height: calc(9 * 6.4rem); */
  max-height: fit-content;
`;

const Empty = styled.p`
  font-size: var(--font-size-0);
  font-weight: var(--font-weight-medium);
  text-align: center;
  margin: var(--space-5);
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role='table'>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role='row' $columns={columns} as='header'>
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role='row' $columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data = [], render, isLoading }) {
  if (!isLoading && !data.length)
    return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
