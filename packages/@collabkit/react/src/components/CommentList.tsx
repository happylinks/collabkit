import React from 'react';
import * as styles from '../styles/components/CommentList.css';
import { NewIndicator } from './NewIndicator';
import { useNewIndicator } from '../hooks/useNewIndicator';
import Comment from './Comment';
import { useTimeline } from '../hooks/useTimeline';
import { groupedTimeline, computeIsResolved } from '@collabkit/core/src/timelineUtils';

const CommentListRoot = (props: React.ComponentProps<'div'>) => (
  <div className={styles.root} {...props} />
);

export default function CommentList(
  props: React.ComponentProps<'div'> & {
    children?: JSX.Element;
  }
) {
  const timeline = useTimeline();
  const isResolved = computeIsResolved(timeline);
  const { list } = groupedTimeline(timeline ?? {});
  const newIndicatorId = useNewIndicator();

  return (
    <CommentListRoot {...props}>
      {list.map((group, groupIndex) => {
        const groupedComments = group.map((event, index) => {
          const commentProps = {
            commentId: event.id,
            hideProfile: index > 0,
            showResolveThreadButton: !isResolved && groupIndex === 0 && index === 0,
          };
          const comment = props.children ? (
            React.cloneElement(props.children, commentProps)
          ) : (
            <Comment {...commentProps} />
          );
          return (
            <React.Fragment key={event.id}>
              {newIndicatorId === event.id && <NewIndicator />}
              {comment}
            </React.Fragment>
          );
        });
        // only add a fragment if the group has comments in it
        return groupedComments ? (
          <React.Fragment key={groupIndex}>{groupedComments}</React.Fragment>
        ) : null;
      })}
    </CommentListRoot>
  );
}

export { CommentListRoot as Root };
CommentList.Root = CommentListRoot;
