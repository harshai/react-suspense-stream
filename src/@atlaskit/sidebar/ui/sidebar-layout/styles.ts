import { TransitionStatus } from 'react-transition-group/Transition';

const transitionStyles = (collapsedWidth: number, expandedWidth: number) => ({
  entering: {
    width: `${expandedWidth}px`,
  },
  entered: {
    width: `${expandedWidth}px`,
  },
  exiting: {
    width: `${collapsedWidth}px`,
  },
  exited: {
    width: `${collapsedWidth}px`,
  },
  unmounted: {},
});

export const sidebarCSS = (status: TransitionStatus, collapsedWidth: number, expandedWidth: number) => {
  return {
    display: 'flex',
    height: '100%',
    position: 'relative',
    width: 'inherit',
    ...transitionStyles(collapsedWidth, expandedWidth)[status],
    '&:hover .resize-icon-button': {
      opacity: 1,
    },
  } as const;
};

export const sidebarContentCSS = {
  background: 'yellow',
  flex: '1 1 auto',
  width: 'inherit',
};
