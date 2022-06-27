import { useCallback, useEffect, useRef } from 'react';
import ScrollArea from './ScrollArea';
import React from 'react';
import { Comment } from './Comment';
import { Event, Profile, Timeline } from '../constants';
import { styled } from '@stitches/react';

export const StyledCommentList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: 0,
  padding: '0px 0px',
});

export function CommentList(props: {
  type?: 'popout' | 'inline';
  profiles: { [profileId: string]: Profile };
  timeline: Timeline;
  composerHeight: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { profiles, timeline, composerHeight } = props;

  const eventIds = Object.keys(timeline);

  const groupedTimeline = eventIds
    .map((id) => timeline[id])
    .reduce<Event[][]>((groupedEvents, event, i) => {
      const nextEvent = timeline[eventIds[i + 1]];
      if (nextEvent) {
        if (nextEvent.createdById === event.createdById) {
          if (typeof nextEvent.createdAt === 'number' && typeof event.createdAt === 'number') {
            // 10 minutes before last message and same person results
            // in a grouped message
            if (nextEvent.createdAt < event.createdAt + 1000 * 60 * 20) {
              if (groupedEvents[groupedEvents.length - 1]) {
                groupedEvents[groupedEvents.length - 1].push(event);
                return groupedEvents;
              }
            }
          }
        }
      }
      return groupedEvents.concat([[event]]);
    }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight + 10);
  }, [timeline && Object.keys(timeline).length]);
  const handleScroll = useCallback((e: React.SyntheticEvent) => {
    // todo use this to load more comments
  }, []);
  return (
    <StyledCommentList
      style={composerHeight > -1 ? { maxHeight: `calc(100% - ${composerHeight + 2}px)` } : {}}
    >
      <ScrollArea.Root style={{ ...(props.type === 'popout' ? { height: 352 } : {}) }}>
        <ScrollArea.Viewport
          css={{
            display: 'flex',
            flex: 1,
          }}
          onScroll={handleScroll}
          ref={scrollRef}
        >
          {groupedTimeline.map((group, i) =>
            group.map((event, j) => {
              let type: 'default' | 'inline-start' | 'inline' | 'inline-end' = 'default';

              if (group.length > 1) {
                type = 'inline';

                if (j === 0) {
                  type = 'inline-start';
                }

                if (j === group.length - 1) {
                  type = 'inline-end';
                }
              }

              return (
                <Comment
                  type={type}
                  timestamp={event.createdAt}
                  key={`event-${i}-${j}`}
                  body={event.body}
                  profile={profiles[event.createdById]}
                />
              );
            })
          )}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </StyledCommentList>
  );
}
