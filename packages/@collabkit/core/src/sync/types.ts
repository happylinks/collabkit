import type { Color } from '@collabkit/colors';
import type {
  Event,
  OptionalWorkspaceProps,
  Subscriptions,
  UserProps,
  ThreadInfo,
  ThreadMeta,
  WithID,
  Profile,
} from '../types';
import type { INTERNAL_Snapshot } from 'valtio';

export interface SyncAdapter {
  shouldAuthenticate(): boolean;

  serverTimestamp(): object;

  getUser(params: { userId: string; appId: string }): Promise<UserProps | null>;

  getIsTyping(props: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }): Promise<null | { [userId: string]: boolean }>;

  saveThreadInfo(params: {
    appId: string;
    workspaceId: string;
    threadId: string;
    info?: ThreadInfo;
  }): Promise<void>;

  getThreadInfo(params: {
    appId: string;
    workspaceId: string;
    threadId: string;
  }): Promise<ThreadInfo | null>;

  saveWorkspace(params: {
    appId: string;
    workspaceId: string;
    workspace?: OptionalWorkspaceProps | null;
  }): Promise<void>;

  getProfile(params: { appId: string; userId: string }): Promise<Profile | null>;

  nextPinId(params: { appId: string; workspaceId: string; objectId: string }): string;

  nextEventId(params: { appId: string; workspaceId: string; threadId: string }): string;

  nextThreadId(params: { appId: string; workspaceId: string }): string;

  subscribeOpenPins(params: {
    appId: string;
    workspaceId: string;
    subs: Subscriptions;
    onGet: (pins: { [objectId: string]: { [pinId: string]: { x: number; y: number } } }) => void;
    onObjectAdded: (objectId: string, pins: { [pinId: string]: { x: number; y: number } }) => void;
    onObjectChange: (objectId: string, pins: { [pinId: string]: { x: number; y: number } }) => void;
    onObjectRemove: (objectId: string) => void;
  }): Promise<void>;

  saveProfile(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    profile: ServerProfile;
  }): Promise<void>;

  markSeen(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
    eventId: string;
  }): Promise<void>;

  startTyping(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }): Promise<void>;

  stopTyping(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }): Promise<void>;

  sendMessage(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
    event: Event | INTERNAL_Snapshot<Event>;
    parentEvent: Event | null | INTERNAL_Snapshot<Event>;
    newEventId: string;
    timeline: { [eventId: string]: Event };
  }): Promise<void>;

  subscribeSeen(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    subs: Subscriptions;
    onSeenChange: SeenEventHandler;
  }): void;

  subscribeInbox(props: {
    appId: string;
    workspaceId: string;
    subs: Subscriptions;
    onInboxChange: InboxChangeEventHandler;
  }): void;

  subscribeThread(props: {
    appId: string;
    userId?: string;
    workspaceId: string;
    threadId: string;
    subs: Subscriptions;
    onThreadResolveChange: (event: ThreadResolveChangeEvent) => void;
    onTimelineEventAdded: (event: TimelineChangeEvent) => void;
    onThreadTypingChange: (event: TypingEvent) => void;
    onThreadInfo: (props: ThreadInfoChangeEvent) => void;
    onThreadProfile: (props: ThreadProfileEvent) => void;
    onTimelineGetComplete: (props: TimelineChangeEvent[]) => void;
    onThreadProfiles: (props: ThreadProfilesEvent) => void;
  }): void;

  subscribeThreadInfo(props: {
    appId: string;
    workspaceId: string;
    threadId: string;
    subs: Subscriptions;
    onThreadInfo: (props: ThreadInfoChangeEvent) => void;
  }): void;
}

export type ServerProfile = Partial<UserProps> & { color?: Color };
export type SeenEventHandler = (event: { threadId: string; seenUntilId: string }) => void;
export type OpenThreadEventHandler = (event: {
  threadId: string;
  info: { meta: ThreadMeta } | null;
  wasRemoved?: boolean;
}) => void;

export type InboxChangeEventHandler = (props: { event: WithID<Event>; threadId: string }) => void;

export type ThreadInfoChangeEvent = {
  threadId: string;
  info: { meta: ThreadMeta } | null;
  workspaceId: string;
};

export type ThreadProfileEvent = {
  threadId: string;
  workspaceId: string;
  userId: string;
};

export type ThreadProfilesEvent = {
  threadId: string;
  workspaceId: string;
  profiles: {
    [userId: string]: true;
  };
};

export type InboxChangeEvent = {
  event: WithID<Event>;
};

export type TimelineChangeEvent = {
  threadId: string;
  workspaceId: string;
  eventId: string;
  event: WithID<Event>;
};

export type ThreadResolveChangeEvent = {
  threadId: string;
  workspaceId: string;
  isResolved: boolean;
};

export type TypingEvent = {
  threadId: string;
  workspaceId: string;
  userId: string;
  isTyping: boolean;
};

export type ThreadSeenEvent = {
  workspaceId: string;
  threadId: string;
  userId: string;
  data: { seenUntilId: string; seenAt: number };
};
