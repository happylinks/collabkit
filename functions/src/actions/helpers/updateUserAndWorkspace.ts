import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { isValidUser } from './isValidUser';
import { deleteUndefinedProps } from './deleteUndefinedProps';
import { WorkspaceProps, UserProps } from '../../types';
import { isValidWorkspace } from './isValidWorkspace';
import shuffle from 'lodash.shuffle';

const colors = [
  'amber',
  'blue',
  'bronze',
  'brown',
  'crimson',
  'cyan',
  'gold',
  'grass',
  'gray',
  'green',
  'indigo',
  'lime',
  'mint',
  'olive',
  'orange',
  'pink',
  'plum',
  'purple',
  'mauve',
  'red',
  'sage',
  'sand',
  'sky',
  'slate',
  'teal',
  'tomato',
  'violet',
  'yellow',
];

function getRandomColor(): string {
  return shuffle(colors)[0];
}

export async function updateUserAndWorkspace(props: {
  appId: string;
  userId: string;
  workspaceId: string;
  workspace?: WorkspaceProps;
  user: UserProps;
}) {
  const { appId, workspaceId, userId, workspace, user } = props;

  const updates: { [path: string]: object | string | boolean } = {};

  const colorSnapshot = await admin.database().ref(`/profiles/${appId}/${userId}/color`).get();
  if (!colorSnapshot.exists()) {
    user.color = getRandomColor();
  }

  // contains an ancestor of the next set of updates
  // so we need to do this one first
  if (workspaceId !== 'default' && isValidWorkspace(workspace)) {
    await admin
      .database()
      .ref(`/workspaces/${appId}/${workspaceId}/`)
      .update(deleteUndefinedProps(workspace));
  }

  if (isValidUser(user)) {
    updates[`/profiles/${appId}/${userId}/`] = deleteUndefinedProps(user);
    updates[`/workspaces/${appId}/${workspaceId}/profiles/${userId}/`] = true;
  } else if (user != null) {
    functions.logger.warn('Invalid profile. Skipping user profile update.', { user });
  }

  await admin.database().ref('/').update(updates);
}
