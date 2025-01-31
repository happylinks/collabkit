import * as functions from 'firebase-functions';
import { isValidUser } from './isValidUser';
import { deleteUndefinedProps } from './deleteUndefinedProps';
import { WorkspaceProps, UserProps } from '../../types';
import { isValidWorkspace } from './isValidWorkspace';
import shuffle from 'lodash.shuffle';
import { ref } from '../data/refs';

const colors = [
  'amber',
  'blue',
  'brown',
  'crimson',
  'cyan',
  'grass',
  'green',
  'indigo',
  'lime',
  'mint',
  'orange',
  'pink',
  'plum',
  'purple',
  'red',
  'sky',
  'teal',
  'tomato',
  'violet',
  'yellow',
];

function getRandomColor(): string {
  return shuffle(colors)[0];
}

type Updates = { [path: string]: object | string | boolean };

export async function updateUser(props: {
  appId: string;
  userId: string;
  workspaceId: string;
  user: UserProps;
}) {
  const { appId, workspaceId, userId, user } = props;

  const colorSnapshot = await ref`/profiles/${appId}/${userId}/color`.get();
  if (!colorSnapshot.exists()) {
    user.color = getRandomColor();
  } else {
    user.color = colorSnapshot.val();
  }

  const updates: Updates = {};
  if (isValidUser(user)) {
    updates[ref.path`/profiles/${appId}/${userId}/`] = deleteUndefinedProps(user);
    if (workspaceId !== 'default') {
      updates[ref.path`/workspaces/${appId}/${workspaceId}/profiles/${userId}/`] = true;
      updates[ref.path`/views/workspaceProfiles/${appId}/${workspaceId}/${userId}`] =
        deleteUndefinedProps(user);
    }
  } else if (user != null) {
    functions.logger.warn('Invalid profile. Skipping user profile update.', { user });
  }

  if (Object.keys(updates).length > 0) {
    await ref`/`.update(updates);
  }
}
