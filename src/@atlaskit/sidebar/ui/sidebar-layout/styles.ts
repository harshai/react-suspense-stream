export const sidebarCSS = (isCollapsed: boolean, width: number) => ({
  display: 'flex',
  height: '100%',
  position: 'relative',
  width: 'inherit',

  ...isCollapsed ? {
    transition: 'width 500ms ease-in-out',
    transitionDelay: '300ms',

    '&:hover': {
      width: `${width}px`,
    },
  } : {},

  '&:hover .resize-icon-button': {
    opacity: 1,
  },
}) as const;

export const sidebarContentCSS = {
  background: 'yellow',
  flex: '1 1 auto',
  width: 'inherit',
};
