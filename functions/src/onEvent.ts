import * as functions from 'firebase-functions';
import { queueWebhookTask } from './actions/queueWebhookTask';
import { scheduleNotificationTask } from './actions/scheduleNotificationTask';

export async function handleCreate(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
  projectId: string;
  event: object;
}) {
  try {
    await Promise.all([scheduleNotificationTask(props), queueWebhookTask(props)]);
  } catch (e) {
    console.error('[onEvent] error', e);
  }
}

export const onEvent = functions
  .runWith({ minInstances: 1 })
  .database.ref('/timeline/{appId}/{workspaceId}/{threadId}/{eventId}')
  .onCreate((snapshot, context) => {
    if (context.authType === 'ADMIN') {
      return;
    }

    const { appId, workspaceId, threadId, eventId } = context.params;

    const projectId = process.env.GCLOUD_PROJECT;

    if (!projectId) {
      throw new Error('GCLOUD_PROJECT environment variable is not set');
    }

    return (async () => {
      await handleCreate({
        appId,
        workspaceId,
        threadId,
        eventId,
        projectId,
        event: snapshot.val(),
      });
    })();
  });
