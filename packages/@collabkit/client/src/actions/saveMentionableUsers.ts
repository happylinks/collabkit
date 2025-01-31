import type { MentionableUsers, Store } from '@collabkit/core';
import { getRandomColor } from '@collabkit/colors';

export async function saveMentionableUsers(store: Store, mentionableUsers: MentionableUsers) {
  const { workspaceId } = store;
  if (!workspaceId) {
    return;
  }

  const { appId } = store.config;

  if (Array.isArray(mentionableUsers)) {
    mentionableUsers.forEach((mentionableUser) => {
      const existingProfile = store.profiles[mentionableUser.id];
      if (existingProfile) {
        store.mentionableUsers[mentionableUser.id] = existingProfile;

        // only support saving colors for users like this
        // if unsecured mode, as we don't need to verify the user
      } else if ('apiKey' in store.config) {
        if (!store.mentionableUsers[mentionableUser.id]) {
          store.mentionableUsers[mentionableUser.id] = {
            ...mentionableUser,
            color: getRandomColor(),
          };
          store.sync.saveProfile({
            appId,
            userId: mentionableUser.id,
            workspaceId,
            profile: store.mentionableUsers[mentionableUser.id],
          });
        }
      }
    });
  }
}
