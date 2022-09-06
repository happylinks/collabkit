import { css } from '@stitches/react';

export const root = css({
  display: 'flex',
  height: '100%',
  position: 'relative',
  flex: 1,
  background: '$colors$backgroundColor',
  borderRadius: '$radii$1',
});

export const content = css({
  padding: 0,
  gap: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyItems: 'stretch',
  flex: 1,
  height: '100%',
  borderRadius: '$radii$1',
});

export const header = css({
  fontSize: '$fontSize$3',
  fontWeight: '$fontWeights$3',
  lineHeight: '$lineHeight$3',
  color: '$neutral12',
  padding: '20px 16px',
  display: 'flex',
  flex: 1,
});

export const headerTitle = css({
  flex: 1,
});

export const headerCloseIcon = css({
  marginTop: 2,
});
