import React, { useState } from 'react';
import { getShade } from '@collabkit/colors';
import { avatarStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import { useApp } from '../hooks/useApp';
import { AvatarProps } from '../types';

export const StyledAvatar = styled('img', avatarStyles.avatar);
export const StyledDefaultAvatar = styled('div', avatarStyles.avatar);

function DefaultAvatar({ profile, size }: AvatarProps) {
  const [didError, setDidError] = useState(false);

  return didError || !profile.avatar ? (
    <StyledDefaultAvatar
      style={{
        ...(size ? { width: size, height: size } : {}),
        ...(profile.color
          ? {
              backgroundColor: getShade(profile.color, 9),
            }
          : {}),
      }}
    >
      {profile.name?.charAt(0)}
    </StyledDefaultAvatar>
  ) : (
    <StyledAvatar
      style={{ ...(size ? { width: size, height: size } : {}) }}
      src={profile.avatar!}
      onError={() => setDidError(true)}
    />
  );
}

export function Avatar(props: AvatarProps) {
  const { renderAvatar } = useApp();
  if (renderAvatar != null) {
    return <>{renderAvatar(props)}</>;
  }
  return <DefaultAvatar {...props} />;
}
