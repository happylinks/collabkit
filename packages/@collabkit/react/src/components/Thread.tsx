import React from 'react';
import { ThreadContext } from '../hooks/useThreadContext';
import { Composer } from './composer/Composer';
import * as styles from '../theme/components/Thread.css';
import { ChatCentered } from './icons';
import { CommentList } from './CommentList';
import { ThreadFacepile } from './ThreadFacepile';
import { ThreadUnreadDot } from './ThreadUnreadDot';
import { ThreadProps } from '../types';
import { Scrollable } from './Scrollable';
import { useThread } from '../hooks/public/useThread';
import { ProfileContext } from '../hooks/ProfileContext';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';
import { ThemeWrapper } from './ThemeWrapper';

const emptyState = (
  <div data-testid="collabkit-thread-empty-state" className={styles.emptyState}>
    <ChatCentered weight="thin" size={32} />
    <span>No comments yet</span>
  </div>
);

function ThreadEmptyState() {
  return emptyState;
}

function ThreadRoot({
  threadId,
  info,
  defaultSubscribers,
  showHeader,
  autoFocus,
  hideComposer,
  placeholder,
  ...props
}: ThreadProps & React.ComponentPropsWithoutRef<'div'>) {
  const { userId } = useThread({
    threadId,
    info,
    defaultSubscribers,
    showHeader,
    autoFocus,
    hideComposer,
    placeholder,
  });
  return (
    <ThemeWrapper>
      <ThreadContext.Provider value={threadId}>
        <ProfileContext.Provider value={userId}>
          <div data-testid="collabkit-thread-root" className={styles.root} {...props} />
        </ProfileContext.Provider>
      </ThreadContext.Provider>
    </ThemeWrapper>
  );
}

function ThreadHeader(props: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-testid="collabkit-thread-header" className={styles.header} {...props} />;
}

function Thread(props: ThreadProps & React.ComponentPropsWithoutRef<'div'>) {
  return useIsAuthenticated() ? (
    <ThreadRoot {...props}>
      {props.showHeader && <ThreadHeader>Comments</ThreadHeader>}
      <Scrollable autoScroll="bottom">
        <CommentList />
      </Scrollable>
      {props.hideComposer ? null : (
        <Composer autoFocus={props.autoFocus} placeholder={props.placeholder} />
      )}
    </ThreadRoot>
  ) : null;
}

export { Thread, ThreadRoot, ThreadHeader, ThreadFacepile, ThreadUnreadDot, ThreadEmptyState };
