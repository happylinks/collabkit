import { createTask } from './helpers/createTask';
import { isValidUrl } from './helpers/isValidUrl';
import { ref } from './data/refs';

export async function queueWebhookTask(
  props: {
    appId: string;
    workspaceId: string;
    threadId: string;
    eventId: string;
    projectId: string;
    event: any;
  },
  createTaskFn: typeof createTask = createTask
) {
  const { projectId, appId, workspaceId, threadId, eventId, event } = props;

  const url = (await ref`/apps/${appId}/webhook/`.get()).val();

  if (!url) {
    // console.log('No webhook url found for app', appId);
    return;
  }

  if (!isValidUrl(url)) {
    return;
  }

  const response = await createTaskFn({
    projectId,
    url: 'https://us-central1-collabkit-dev.cloudfunctions.net/triggerWebhook',
    queue: 'webhooks',
    payload: {
      url,
      appId,
      workspaceId,
      threadId,
      eventId,
      event,
    },
  });

  return response;
}
