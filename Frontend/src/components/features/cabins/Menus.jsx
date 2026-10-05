import { createContext, useContext, useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

const Menu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: var(--space-1);
  border-radius: var(--border-radius-sm);
  transform: translateX(var(--space-2));
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-primary-tint-900);
  }

  & svg {
    width: var(--space-5);
    height: var(--space-5);
    color: var(--color-primary-tint-100);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  background-color: var(--color-primary-tint-950);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  max-height: fit-content;
  text-align: left;
  background: none;
  border: none;
  padding: var(--space-4) var(--space-5);
  font-size: var(--font-size-m1);
  transition: all 0.2s;
  white-space: nowrap;

  display: flex;
  align-items: center;
  gap: var(--space-4);

  &:hover {
    background-color: var(--color-primary-tint-900);
  }

  & svg {
    width: var(--space-4);
    height: var(--space-4);
    color: var(--color-primary-tint-500);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest('button').getBoundingClientRect();

    setPosition({
      x: -8,
      y: rect.height,
    });

    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return (
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
