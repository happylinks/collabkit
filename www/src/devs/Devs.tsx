import { onChildAdded, ref, onChildRemoved } from 'firebase/database';

import { database, auth } from './database';
import { devStore } from './devStore';
import { devEvents } from './devEvents';
import { onAuthStateChanged } from '@firebase/auth';
import { AppList } from './AppList';

import { useSnapshot } from 'valtio';
import { EnterEmail } from './EnterEmail';
import { CheckEmail } from './CheckEmail';
import { StickyHeader } from '../StickyHeader';
import { Logo } from '../Logo';
import { useEffect } from 'react';
import { devActions } from './devActions';

export function Devs() {
  const { authState } = useSnapshot(devStore);

  useEffect(() => {
    if (window.location.href.includes('signedIn')) {
      devActions.verifyEmailLink();
    }
  }, []);

  const view = {
    blank: <></>,
    signedOut: <EnterEmail />,
    signedIn: <AppList />,
    magicLinkSent: <CheckEmail />,
    confirmEmailPrompt: <EnterEmail isReentry={true} />,
  };

  return (
    <div>
      <StickyHeader
        style={{ marginTop: '1.5rem' }}
        left={<Logo onClick={() => (window.location.href = '/')} />}
      />
      {view[authState]}
    </div>
  );
}
