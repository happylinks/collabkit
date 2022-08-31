import React from 'react';

import { sendMail } from '../emails';
import NotificationEmail from '../emails/NotificationEmail';
import { onConnect } from './data/onConnect';
import { setNotifiedUntil } from './data/setNotifiedUntil';
import { isDefaultWorkspace } from './helpers/isDefaultWorkspace';
import { fetchWorkspaceProfiles } from './data/fetchWorkspaceProfiles';
import { fetchThreadInfo } from './data/fetchThreadInfo';
import { getThreadProfiles } from './helpers/getThreadProfiles';
import { fetchWorkspaceName } from './data/fetchWorkspaceName';
import { fetchTimeline } from './data/fetchTimeline';
import { fetchProfiles } from './data/fetchProfiles';
import { fetchApp } from './data/fetchApp';
import { App, Event, Profile, SeenBy, ThreadInfo, TimelineWithEventId } from '../types';
import { isAppNotifiable } from './helpers/isAppNotifiable';
import { canSendEmail } from './helpers/canSendEmail';
import { fetchNotifiedUntilId } from './data/fetchNotifiedUntilId';
import { groupedEvents } from './helpers/groupedEvents';
import { fetchIsMuted } from './data/fetchIsMuted';
import { fetchSeenBy } from './data/fetchSeenBy';

async function sendMailForProfile(props: {
  eventId: string;
  appId: string;
  workspaceId: string;
  profileId: string;
  threadId: string;
  app: App;
  threadInfo: ThreadInfo;
  workspaceName: string | undefined;
  profiles: { [userId: string]: Profile };
  timeline: TimelineWithEventId;
  event: Event;
  seenBy: SeenBy;
}) {
  const {
    eventId,
    appId,
    workspaceId,
    profileId,
    threadId,
    timeline,
    profiles,
    app,
    threadInfo,
    workspaceName,
    event,
    seenBy,
  } = props;
  if (!profiles[profileId]) {
    console.debug('no profile found skipping', profileId);
    return null;
  }

  if (!profiles[profileId].email) {
    console.debug('no profile email found skipping', profileId);
    return null;
  }

  if (!canSendEmail(profiles[profileId])) {
    console.debug('cant send email', profileId);
    return null;
  }

  const isMuted = await fetchIsMuted({ appId, workspaceId, profileId, threadId });

  if (isMuted) {
    console.debug('muted', profileId);
    return null;
  }

  const notifiedUntilId = await fetchNotifiedUntilId({ appId, workspaceId, profileId, threadId });

  const eventIds = Object.keys(timeline);

  let notifyFrom = !notifiedUntilId ? eventIds[0] : eventIds[eventIds.indexOf(notifiedUntilId) + 1];

  if (!notifyFrom) {
    console.log('no notifyFrom, skipping', profileId);
    return null;
  }

  const notifyAboutEventIds = eventIds.slice(eventIds.indexOf(notifyFrom));

  if (seenBy[profileId]?.seenUntilId) {
    const index = notifyAboutEventIds.indexOf(seenBy[profileId]?.seenUntilId);
    if (index > 0) {
      // remove events that have been seen by the user
      notifyAboutEventIds.splice(0, index);
    }
  }

  if (notifyAboutEventIds.length === 0) {
    console.debug('no events to notify about, skipping');
    return null;
  }

  const messageEvents = notifyAboutEventIds
    .map((eventId) => timeline[eventId])
    .filter((event) => event.type === 'message');

  const list = groupedEvents(messageEvents, timeline);

  if (profileId === event.createdById) {
    console.debug(
      'profileId === _event.createdById skipping and setting notifiedUntil',
      profileId,
      eventId
    );
    await setNotifiedUntil({ appId, workspaceId, threadId, profileId, notifiedUntilId: eventId });
    return null;
  }

  const to = profiles[profileId].email;

  let subject = notifyAboutEventIds.length > 1 ? 'New comments' : 'New comment';
  if (workspaceId.toLowerCase() === 'default') {
    subject = `${subject} in ${app.name}`;
  } else if (workspaceName) {
    subject = `${subject} in ${workspaceName}`;
  }

  if (threadInfo.name) {
    subject = `${subject} on ${threadInfo.name}`;
  }

  if (!threadInfo.url) {
    return null;
  }

  const component = (
    <NotificationEmail
      openUrl={threadInfo.url}
      accentColor={app.accentColor}
      appLogoUrl={app.logoUrl}
      ctaText={list.length === 1 ? 'View comment' : 'View comments'}
      activity={list.length === 1 ? 'New comment' : 'New comments'}
      threadName={threadInfo.name}
      workspaceName={workspaceName}
      appName={app.name}
      commentList={list}
      profiles={profiles}
    />
  );

  const mail = {
    subject,
    to,
    component,
  };

  console.log(mail.subject, mail.to);

  const newNotifiedUntilId = notifyAboutEventIds[notifyAboutEventIds.length - 1];

  if (!newNotifiedUntilId) {
    console.debug('no newNotifiedUntilId, exiting');
    return null;
  }

  try {
    await sendMail(mail);
  } catch (e) {
    console.error('sendMail failed', e);
    return null;
  }

  return setNotifiedUntil({
    appId,
    workspaceId,
    profileId,
    threadId,
    notifiedUntilId: newNotifiedUntilId,
  });
}

export async function generateAndSendEmailNotifications(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
}) {
  const { appId, workspaceId, threadId, eventId } = props;

  console.log('fetchData', { appId, workspaceId, threadId, eventId });

  const isConnected = await onConnect();
  if (isConnected) {
    const { app } = await fetchApp({ appId });

    if (!isAppNotifiable({ app })) {
      console.debug('app is not notifiable, exiting');
      return null;
    }

    let workspaceName: string | null = null;
    try {
      workspaceName = await (await fetchWorkspaceName({ appId, workspaceId })).workspaceName;
    } catch (e) {
      console.error('fetchWorkspaceName failed', e);
    }

    const { timeline } = await fetchTimeline({ appId, workspaceId, threadId });

    const profileIds = isDefaultWorkspace(workspaceId)
      ? getThreadProfiles({ timeline })
      : await fetchWorkspaceProfiles({
          appId,
          workspaceId,
        });

    if (profileIds.length === 0) {
      console.debug('0 profileIds, exiting');
      return null;
    }

    if (profileIds.length === 1) {
      console.debug('1 profileIds, exiting');
      return null;
    }

    const { threadInfo } = await fetchThreadInfo({ appId, workspaceId, threadId });

    const { profiles } = await fetchProfiles({ appId, profileIds });

    console.debug('fetched profiles', profiles);

    let event = timeline[eventId];

    const createdByProfile = profiles[event.createdById];
    if (!createdByProfile) {
      console.debug('could not find profiles[event.createdById], exiting');
      return null;
    }

    console.log('generateNotification', { appId, workspaceId, threadId, eventId });

    const seenBy = await fetchSeenBy({ appId, workspaceId, threadId });

    await Promise.allSettled(
      profileIds.map((profileId) =>
        sendMailForProfile({
          appId,
          eventId,
          profileId,
          threadId,
          workspaceId,
          app,
          threadInfo,
          workspaceName,
          profiles,
          timeline,
          event,
          seenBy,
        })
      )
    );
  }

  return null;
}

// admin.initializeApp({
//   credential: admin.credential.cert('/Users/namitchadha/collabkit-dev-service-account.json'),
//   databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app/',
// });

// generateAndSendEmailNotifications({
//   appId: '-N67qY-qlZoWmkQBPyZU',
//   eventId: '-NA5tT6WrPFAZ6PVIVfo',
//   threadId: 'your-thread-id',
//   workspaceId: 'foobar',
// })
//   .then(() => {
//     console.log('done');
//   })
//   .catch((e) => {
//     console.error('failed', e);
//   });
