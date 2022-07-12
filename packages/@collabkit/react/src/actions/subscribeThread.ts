import { Store } from '../constants';
import { createEditor } from 'lexical';
import { createEditorConfig } from '../components/Composer';
import { ref as valtioRef } from 'valtio';
import { getConfig } from './index';
import { subscribeThreadSeenBy } from './subscribeThreadSeenBy';
import { subscribeThreadIsTyping } from './subscribeThreadIsTyping';
import { subscribeToTimeline } from './subscribeToTimeline';

export async function subscribeThread(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
  }
) {
  // initialise the store
  store.workspaces[props.workspaceId] ||= {
    inbox: {},
    pins: {},
    name: store.config.identify?.workspaceName || '',
    composers: {
      [props.threadId]: {
        editor: valtioRef(createEditor(createEditorConfig())),
        $$body: '',
        isTyping: {},
      },
    },
    timeline: {},
    seen: {},
    seenBy: {},
  };

  store.workspaces[props.workspaceId].composers[props.threadId] ||= {
    editor: valtioRef(createEditor(createEditorConfig())),
    $$body: '',
    isTyping: {},
  };

  const { appId, userId } = getConfig(store);

  subscribeToTimeline(store, props);
  subscribeThreadIsTyping(store, props.workspaceId, props.threadId);

  // we could probably make this more efficient by only subscribing to it when the thread is visible.
  subscribeThreadSeenBy(store, { appId, userId, ...props });
}
