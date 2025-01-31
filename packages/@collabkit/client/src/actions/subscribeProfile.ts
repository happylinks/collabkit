import { onValue } from 'firebase/database';
import { ref } from '../sync/firebase/refs';
import type { Profile, Store } from '@collabkit/core';
import { FirebaseId } from '@collabkit/core';
import { getConfig } from './getConfig';
import { snapshotToProfile } from '../sync/firebase/converters';
import { ensureColor } from './saveProfile';

export async function subscribeProfile(
  store: Store,
  props: { profileId: string; onSubscribe: (profile: Profile) => void }
) {
  const { profileId } = props;
  const { appId } = getConfig(store);

  const onError = (e: Error) => {
    console.error({ e });
  };

  const id = FirebaseId.decode(profileId);
  const profileRef = ref`/profiles/${appId}/${id}`;

  if (store.profiles[profileId]) return;

  store.subs[profileRef.toString()] ||= onValue(
    profileRef,
    (profileSnapshot) => {
      const profile = snapshotToProfile(profileSnapshot);
      if (profile) {
        store.profiles[id] = ensureColor(profile);
        if (!profile.isDeleted) {
          store.mentionableUsers[id] = profile;
        }
        props.onSubscribe(profile);
      } else {
        console.warn(`[CollabKit] Profile '${id}' not found'`);
      }
    },
    onError
  );
}
