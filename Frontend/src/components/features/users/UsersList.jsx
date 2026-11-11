import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import UserCard from './UserCard';
import { useUsersContext } from '../../../hooks/useUsersContext';
import { useGetAllUsers } from '../../../hooks/useGetAllUsers';
import { useSetCabins } from '../../../hooks/useSetCabins';
import { useCabinsContext } from '../../../hooks/useCabinsContext';

const CardList = styled.ul`
  display: flex;

  gap: 7.2rem;
  overflow-x: scroll;
  scrollbar-width: none;
  width: 80%;
  padding: var(--space-4);
`;

function UsersList() {
  const { getAllUsers } = useGetAllUsers();
  const { setCabins } = useSetCabins();
  const { state: usersState } = useUsersContext();
  const { cabins } = useCabinsContext();

  const usersRequestStarted = useRef(false);
  const cardListRef = useRef(null);
  const targetScrollPointRef = useRef(0);
  const animationRef = useRef(null);
  const scrollSensibility = 1;

  const scrollAnimation = useCallback(function animateScroll() {
    const cardList = cardListRef.current;
    if (!cardList) return;

    const currentScrollPoint = cardList.scrollLeft;
    const targetScrollPoint = targetScrollPointRef.current;

    if (Math.abs(targetScrollPoint - currentScrollPoint) < 1) {
      cardList.scrollLeft = targetScrollPoint;
      animationRef.current = null;
      return;
    }

    const newScrollLeft =
      currentScrollPoint + (targetScrollPoint - currentScrollPoint) * 0.15;
    cardList.scrollLeft = newScrollLeft;

    animationRef.current = requestAnimationFrame(animateScroll);
  }, []);

  const horizontalScroll = useCallback(
    (e) => {
      e.preventDefault();

      const cardList = cardListRef.current;
      if (!cardList) return;

      const maxScroll = Math.max(
        0,
        cardList.scrollWidth - cardList.clientWidth,
      );

      const requestedTarget =
        targetScrollPointRef.current + e.deltaY * scrollSensibility;
      targetScrollPointRef.current = Math.min(
        Math.max(requestedTarget, 0),
        maxScroll,
      );

      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(scrollAnimation);
      }
    },
    [scrollAnimation, scrollSensibility],
  );

  useEffect(() => {
    if (usersState?.users || usersRequestStarted.current) return;

    usersRequestStarted.current = true;
    getAllUsers().then((users) => {
      if (!users) usersRequestStarted.current = false;
    });
  }, [getAllUsers, usersState?.users]);

  useEffect(() => {
    if (cabins === null) setCabins();
  }, [cabins, setCabins]);

  useEffect(() => {
    const cardList = cardListRef.current;
    if (!cardList) return;

    cardList.addEventListener('wheel', horizontalScroll, {
      passive: false,
    });

    return () => {
      cardList.removeEventListener('wheel', horizontalScroll);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [horizontalScroll]);

  return (
    <CardList ref={cardListRef}>
      {usersState?.users?.admins &&
        usersState.users.admins.map((admin) => (
          <UserCard
            key={admin._id}
            user={admin}
            role='Admin'
            cabins={cabins?.filter((cabin) =>
              cabin.users_id.admins_id?.some((id) => id === admin._id),
            )}
          />
        ))}
      {usersState?.users?.collaborators &&
        usersState.users.collaborators.map((collaborator) => (
          <UserCard
            key={collaborator._id}
            user={collaborator}
            role='Collaborator'
            cabins={cabins?.filter((cabin) =>
              cabin.users_id.collaborators_id?.some(
                (id) => id === collaborator._id,
              ),
            )}
          />
        ))}
    </CardList>
  );
}

export default UsersList;
