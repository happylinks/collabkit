import { DataSnapshot, onChildAdded, onChildChanged, ref } from 'firebase/database';
import { DB, Store } from '../constants';
import { getConfig } from './index';

export async function subscribeProfiles(store: Store) {
  const { appId } = getConfig(store);
  const onError = (e: Error) => {
    console.error({ e });
  };
  const onChange = (child: DataSnapshot) => {
    if (child.key) {
      const profile = child.val();
      store.profiles[child.key] = profile;
    }
  };

  store.subs[`profile#added`] = onChildAdded(ref(DB, `/profiles/${appId}`), onChange, onError);

  store.subs[`profile#changed`] = onChildChanged(ref(DB, `/profiles/${appId}`), onChange, onError);
}
