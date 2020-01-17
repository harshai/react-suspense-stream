export const sidebarCSS = (collapsedWidth: number, expandedWidth: number) => {
  return {
    display: 'flex',
    height: '100%',
    position: 'relative',
    width: 'inherit',
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
