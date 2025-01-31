import { Target } from '@collabkit/core';

export function isSameComment(a: Target | null, b: Target | null) {
  return (
    a !== null &&
    b !== null &&
    a.type === 'comment' &&
    b.type === 'comment' &&
    a.threadId === b.threadId &&
    a.type === b.type &&
    a.workspaceId === b.workspaceId &&
    a.eventId === b.eventId
  );
}
