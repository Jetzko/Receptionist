import styled, { keyframes } from 'styled-components';
import Button from '../../reusable/Button';
import { HiTrash } from 'react-icons/hi2';
import { HiOutlinePencil } from 'react-icons/hi2';
import { HiMiniEllipsisVertical } from 'react-icons/hi2';
import { useState } from 'react';
import { useDeleteUser } from '../../../hooks/useDeleteUser';

const UserCardStyled = styled.li`
  width: var(--space-9);
  height: auto;
  flex-shrink: 0;
  border-radius: var(--border-radius-lg);
  position: relative;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: var(--space-4);
  position: relative;

  & h3 {
    color: var(--color-tertiary-shade-50);
  }

  & span {
    color: var(--color-primary-tint-500);
  }
`;

const UserImage = styled.div`
  border-radius: 50%;
  width: content;
  height: content;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AvatarImg = styled.img`
  display: block;
  width: var(--space-6);
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-primary-tint-500);
`;

const DetailsPanel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  flex: 0;
  visibility: hidden;
  opacity: 0;
  z-index: 5;
  background-color: var(--color-tertiary-tint-900);
  color: var(--color-tertiary-shade-200);
  transition: ease-out all 0.3s;

  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--padding-xsm);
  border-top: 1px solid var(--color-tertiary-tint-700);
  border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: var(--space-3);

  &:hover ${DetailsPanel} {
    visibility: visible;
    opacity: 1;
    height: 80%;
  }
`;

const Card = styled.div`
  height: var(--space-10);
  z-index: 1;
  display: flex;
  position: relative;
  flex-grow: 0;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  background-color: #fff;

  flex-direction: column;

  & div {
    flex: 1;
  }

  & span {
    font-size: var(--font-size-m1);
  }

  &:has(${CardBody}:hover) ${CardHeader} {
    filter: blur(2px);
  }
`;

const ActionButtons = styled.div``;

const ConfirmDelete = styled.div``;

const Actions = styled.div`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? '1fr' : '0fr')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-1.2rem')});
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    grid-template-rows 200ms ease,
    opacity 200ms ease,
    transform 200ms ease,
    visibility 0s ${({ $isOpen }) => ($isOpen ? '0s' : '200ms')};

  & > ${ActionButtons} {
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  & > ${ConfirmDelete} {
    min-height: 0;
    display: flex;
    justify-content: space-evenly;
    padding: var(--space-4) var(--space-2) var(--space-2);
    background-color: var(--color-tertiary-tint-800);
    border-radius: var(--border-radius-lg);
  }
`;

const Options = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const ConfirmDeleteContainer = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  margin-top: calc(-1 * var(--border-radius-lg));
  border-radius: var(--border-radius-lg);
`;

function UserCard({ user, role, cabins }) {
  const [isOptionsOn, setIsOptionsOn] = useState(false);
  const [isConfirmDeleteOn, setIsConfirmDeleteOn] = useState(false);
  const { deleteUserFromList, error, isLoading } = useDeleteUser();

  function handleOptionsClick() {
    setIsOptionsOn((isOptionsOn) => !isOptionsOn);
  }

  function handleDeleteUser() {
    setIsConfirmDeleteOn((isConfirmDeleteOn) => !isConfirmDeleteOn);
    setIsOptionsOn((isOptionsOn) => !isOptionsOn);
  }

  function handleConfirmDeleteUser(id) {
    deleteUserFromList(id);
    setIsConfirmDeleteOn((isConfirmDeleteOn) => !isConfirmDeleteOn);
  }

  return (
    <UserCardStyled>
      <Card>
        <CardHeader>
          <Options>
            <Button
              onClick={handleOptionsClick}
              $variation='secondary'
              $size='xsmall'
              disabled={isConfirmDeleteOn}
            >
              <HiMiniEllipsisVertical />
            </Button>
            <Actions $isOpen={isOptionsOn} inert={!isOptionsOn}>
              <ActionButtons>
                <Button
                  onClick={handleDeleteUser}
                  $variation='secondary'
                  $size='xsmall'
                >
                  <HiTrash />
                </Button>
              </ActionButtons>
            </Actions>
          </Options>

          <span>{user.nickname}</span>
          <h3>{user.fullName}</h3>
          <UserImage>
            <AvatarImg src='../../../../public/default-user.jpg' />
          </UserImage>
        </CardHeader>
        <CardBody>
          <span>{role}</span>
          <span>
            Cabins:{' '}
            {cabins === undefined || cabins.length === 0
              ? 'Not yet assigned'
              : cabins.map((cabin) => cabin.name).join(', ')}
          </span>
          <span>{user.phone ? `Phone: ${user.phone}` : 'Phone: N/D'}</span>
          <DetailsPanel>
            <span>
              {user.languages?.length >= 1
                ? `Languages: ${user.languages.join(', ')}`
                : 'Languages: N/D'}
            </span>
            <span>
              {user.description
                ? `Description: ${user.description}`
                : 'Description: N/D'}
            </span>
          </DetailsPanel>
        </CardBody>
      </Card>
      <ConfirmDeleteContainer>
        <Actions $isOpen={isConfirmDeleteOn} inert={!isConfirmDeleteOn}>
          <ConfirmDelete>
            <Button
              $variation='danger'
              $size='small'
              onClick={() => handleConfirmDeleteUser(user._id)}
            >
              DELETE
            </Button>
            <Button
              $variation='secondary'
              $size='small'
              onClick={() =>
                setIsConfirmDeleteOn((isConfirmDeleteOn) => !isConfirmDeleteOn)
              }
            >
              CANCEL
            </Button>
          </ConfirmDelete>
        </Actions>
      </ConfirmDeleteContainer>
    </UserCardStyled>
  );
}

export default UserCard;
