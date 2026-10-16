import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import UserCard from '../../UserCard';

const Card = styled.div``;

const CardList = styled.ul`
  display: flex;
  gap: 7.2rem;
  overflow-x: scroll;
  /* scrollbar-width: none; */
  width: 100%;
`;

function UsersList() {
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
    <>
      <CardList ref={cardListRef}>
        <UserCard>
          <Card></Card>
        </UserCard>
        <UserCard>Collaborator #1</UserCard>
        <UserCard>Collaborator #2</UserCard>
        <UserCard>Collaborator #2</UserCard>
        <UserCard>Collaborator #2</UserCard>
        <UserCard>Collaborator #2</UserCard>
        <UserCard>Collaborator #2</UserCard>
        <UserCard>Collaborator #2</UserCard>
        <UserCard>Collaborator #2</UserCard>
      </CardList>
    </>
  );
}

export default UsersList;
