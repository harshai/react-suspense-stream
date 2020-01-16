import { B100, B200 } from '@atlaskit/theme/colors';

export const resizeControlCSS = {
  background: 'red',
  height: '100%',
  left: '100%',
  position: 'absolute',
  width: 24,

  '&:hover .grab-area-line': {
    backgroundColor: B100,
  },
  '&:active .grab-area-line': {
    backgroundColor: B200,
  },

  '&:hover .resize-icon-button:not(:focus):not(:hover)': {
    color: B100,
  },
} as const;

export const resizeIconButtonCSS = {
  position: 'absolute',
  top: 32,
  transform: `translate(-50%)`,
} as const;
