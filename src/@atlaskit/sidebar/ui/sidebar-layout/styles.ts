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

const colorStops = `
    rgba(0, 0, 0, 0.2) 0px,
    rgba(0, 0, 0, 0.2) 1px,
    rgba(0, 0, 0, 0.1) 1px,
    rgba(0, 0, 0, 0) 100%
  `;

export const sidebarContentCSS = {
  background: 'rgb(244, 245, 247)',
  flex: '1 1 auto',
  position: 'relative',
  width: 'inherit',

  '&::after': {
    background: `linear-gradient(to left, ${colorStops})`,
    bottom: 0,
    content: '""',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 3,
  },
};
