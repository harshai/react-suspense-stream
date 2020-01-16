import { createHook, createStore } from 'react-sweet-state';

const Store = createStore({
  initialState: {
    collapsedWidth: 25,
    expandedWidth: 250,
    isCollapsed: false,
    width: 250,
  },
  actions: {
    collapse: () => ({ getState, setState }) => {
      const { collapsedWidth } = getState();
      setState({
        isCollapsed: true,
        width: collapsedWidth,
      });
    },
    expand: () => ({ getState, setState }) => {
      const { expandedWidth } = getState();
      setState({
        isCollapsed: false,
        width: expandedWidth,
      });
    },
    onResize: (width: number) => ({ getState, setState }) => {
      const { width: currentWidth } = getState();
      if (currentWidth !== width) {
        setState({
          expandedWidth: width,
          width,
        });
      }
    },
  },
  name: '@atlaskit/sidebar',
});

export const useSidebar = createHook(Store);
