import { B100, B200 } from '@atlaskit/theme/colors';

export const grabAreaCSS = {
  cursor: 'ew-resize',
  height: '100%',
  '&:hover > .grab-area-line': {
    backgroundColor: B100,
  },
  '&:active > .grab-area-line': {
    backgroundColor: B200,
  }
};

export const lineCSS = {
  height: '100%',
  transition: 'background-color 200ms',
  width: 2,
};
