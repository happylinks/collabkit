import React, { forwardRef } from 'react';
import * as ScrollArea from '@collabkit/react-scroll-area';
import * as styles from '../theme/components/ScrollArea.css';

const ScrollAreaRoot: React.ForwardRefExoticComponent<
  ScrollArea.ScrollAreaProps & React.RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => (
  <ScrollArea.Root {...props} ref={ref} className={props.className ?? styles.root} />
));

const ScrollAreaViewport: React.ForwardRefExoticComponent<
  ScrollArea.ScrollAreaViewportProps & React.RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => (
  <ScrollArea.Viewport {...props} ref={ref} className={props.className ?? styles.viewport} />
));

const ScrollAreaScrollbar: React.ForwardRefExoticComponent<
  ScrollArea.ScrollAreaScrollbarProps & React.RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => (
  <ScrollArea.Scrollbar {...props} ref={ref} className={props.className ?? styles.scrollbar} />
));

const ScrollAreaThumb: React.ForwardRefExoticComponent<
  ScrollArea.ScrollAreaThumbProps & React.RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => (
  <ScrollArea.Thumb {...props} ref={ref} className={props.className ?? styles.thumb} />
));

const ScrollAreaCorner: React.ForwardRefExoticComponent<
  ScrollArea.ScrollAreaCornerProps & React.RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => (
  <ScrollArea.Corner {...props} ref={ref} className={props.className ?? styles.corner} />
));

export function Scrollable(props: {
  children: React.ReactNode;
  className?: string;
  maxHeight?: React.CSSProperties['maxHeight'];
  autoScroll?: 'none' | 'bottom';
  alignToBottom?: boolean;
  minHeight?: React.CSSProperties['minHeight'];
  onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}) {
  const { maxHeight, minHeight } = props;
  return (
    <ScrollAreaRoot autoScroll={props.autoScroll} alignToBottom={props.alignToBottom}>
      <ScrollAreaViewport
        className={props.className}
        onScroll={props.onScroll}
        style={{ maxHeight: maxHeight ?? 'inherit', minHeight: minHeight ?? 'unset' }}
      >
        {props.children}
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  );
}
