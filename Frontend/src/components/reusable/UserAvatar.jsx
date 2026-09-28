import styled from 'styled-components';

const StyledUserAvatar = styled.div`
  display: flex;
  gap: var(--space-3);
  align-items: center;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-m1);
  color: var(--color-primary-shade-350);
`;

const AvatarImg = styled.img`
  display: block;
  width: var(--space-5);
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-primary-tint-500);
`;

function UserAvatar() {
  return (
    <StyledUserAvatar>
      <AvatarImg src='./default-user.jpg' />
      <span>User</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
