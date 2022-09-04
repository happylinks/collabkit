import React, { useRef } from 'react';
import { CommentType, Event, Profile } from '../constants';
import { Avatar } from './Avatar';
import { HStack } from './UIKit';
import { MessageHeader } from './comment/MessageHeader';
import { commentStyles } from '@collabkit/theme';

import { WithHasProfile } from '@collabkit/core';
import { useOnMarkdownLinkClick } from '../hooks/useOnMarkdownLinkClick';
import { Markdown } from './Markdown';
import { useThreadContext } from '../hooks/useThreadContext';
import { styled } from '@stitches/react';
import { useHasOverflow } from '../hooks/useHasOverflow';
import { useMarkAsSeen } from '../hooks/useMarkAsSeen';

const Root = styled('div', commentStyles.container);
const Message = styled('div', commentStyles.message);
const Body = styled('span', commentStyles.body);
const BodyEllipsis = styled('span', commentStyles.bodyEllipsis);

export function Comment(props: {
  id: string;
  reactions: { [createdById: string]: Event };
  timestamp: number | object;
  body: string;
  seen?: boolean;
  event: WithHasProfile<Event>;
  profile: Profile;
  type: CommentType;
  isPreview?: boolean;
}) {
  const { threadId, workspaceId, userId } = useThreadContext();
  const bodyRef = useRef(null);

  const target = {
    type: 'comment',
    workspaceId,
    threadId,
    eventId: props.id,
  } as const;

  const { ref } = useMarkAsSeen(target);

  const showProfile = props.type === 'default' || props.type === 'inline-start';
  const { onClick } = useOnMarkdownLinkClick({
    ...props,
    workspaceId,
    threadId,
    userId,
    event: { ...props.event, id: props.id },
  });

  const isOverflowing = useHasOverflow(bodyRef, [props.body]);

  if (
    props.event.type === 'system' ||
    !props.event.hasProfile ||
    typeof props.profile !== 'object'
  ) {
    return null;
  }

  return (
    <Root seen={props.seen} type={props.type ?? 'default'} isPreview={props.isPreview} ref={ref}>
      {showProfile && <Avatar profile={props.profile} />}
      <HStack>
        <Message profileIndent={!showProfile}>
          {showProfile && (
            <MessageHeader
              name={props.profile.name ?? props.profile.email ?? 'Anonymous'}
              createdAt={+props.timestamp}
            />
          )}
          <Body ref={bodyRef} isPreview={props.isPreview} onClick={onClick}>
            <Markdown body={props.body} />
            {isOverflowing ? <BodyEllipsis>{'...'}</BodyEllipsis> : null}
          </Body>
        </Message>
      </HStack>
    </Root>
  );
}
