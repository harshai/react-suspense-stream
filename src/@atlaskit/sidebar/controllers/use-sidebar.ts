import { createHook, createStore } from 'react-sweet-state';

const Store = createStore({
  initialState: {
    isCollapsed: false,
    width: 250,
  },
  actions: {
    collapse: () => ({ setState }) => {
      setState({
        isCollapsed: true,
        width: 25,
      });
    },
    expand: () => ({ setState }) => {
      setState({
        isCollapsed: false,
        width: 250,
      });
    },
    onResize: (width: number) => ({ getState, setState }) => {
      const { width: currentWidth } = getState();
      if (currentWidth !== width) {
        console.log('width', width);
        setState({
          width,
        });
      }
    },
    toggle: () => ({ getState, setState }) => {
      const isCollapsed = !getState().isCollapsed;
      setState({
        isCollapsed,
        width: isCollapsed ? 25 : 250,
      });
    },
  },
  name: '@atlaskit/sidebar',
});

export const useSidebar = createHook(Store);
