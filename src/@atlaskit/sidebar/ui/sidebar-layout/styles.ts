export const sidebarCSS = {
  display: 'flex',
  height: '100%',
  position: 'relative',

  '&:hover .resize-icon-button': {
    opacity: 1,
  },
} as const;

export const sidebarContentCSS = {
  flex: '1 1 auto',
  width: '100%',
};
