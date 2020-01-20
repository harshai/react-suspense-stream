import { createContainer, createHook, createStore } from 'react-sweet-state';
import { animate } from './utils';

const Store = createStore({
  initialState: {
    collapsedWidth: 25,
    expandedWidth: 250,
    isCollapsed: false,
    liveWidth: 250,
    width: 250,
  },
  actions: {
    collapse: () => ({ getState, setState }, { setWidth }) => {
      const { collapsedWidth, width } = getState();
      animate({
        from: width,
        onComplete: () => {
          setState({
            isCollapsed: true,
            width: collapsedWidth,
          });
        },
        setWidth: (currentWidth: number) => {
          setWidth(currentWidth);
          setState({
            liveWidth: currentWidth,
          });
        },
        to: collapsedWidth,
      });
    },
    expand: () => ({ getState, setState }, { setWidth }) => {
      const { expandedWidth, width } = getState();
      animate({
        from: width,
        onComplete: () => {
          setState({
            isCollapsed: false,
            width: expandedWidth,
          });
        },
        setWidth: (currentWidth: number) => {
          setWidth(currentWidth);
          setState({
            liveWidth: currentWidth,
          });
        },
        to: expandedWidth,
      });
    },
    resize: (width: number) => ({ getState, setState }, { setWidth }) => {
      const { isCollapsed, width: currentWidth } = getState();
      if (!isCollapsed && currentWidth !== width) {
        setWidth(width);
        setState({
          liveWidth: width,
        });
      }
    },
    setWidth: (width: number) => ({ getState, setState }, { setWidth }) => {
      const { isCollapsed, width: currentWidth } = getState();
      if (!isCollapsed && currentWidth !== width) {
        setWidth(width);
        setState({
          expandedWidth: width,
          liveWidth: width,
          width,
        });
      }
    },
  },
  name: '@atlaskit/sidebar',
});

export const SidebarContainer = createContainer(Store, {
  onInit: () => ({ setState }, { setWidth, width }) => {
    setWidth(width);
    setState({
      setWidth,
    });
  },
});

export type SidebarOptions = {
  live?: boolean;
};

export const useSidebar = createHook(Store, {
  selector: (state, { live } : SidebarOptions = { live: false }) => {
    const { liveWidth, width, ...sidebarState } = state;
    return live ? { ...sidebarState, width: liveWidth } : { ...sidebarState, width };
  },
});

export const useSidebarApi = createHook(Store, {
  selector: null,
});
