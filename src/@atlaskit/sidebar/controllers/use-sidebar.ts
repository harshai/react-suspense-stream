import { ActionAny, createContainer, createHook, createStore } from 'react-sweet-state';
import { animate } from './utils';

type SidebarState = {
  collapsedWidth: number;
  expandedWidth: number;
  isCollapsed: boolean;
  liveWidth: number;
  width: number;
};

type ContainerProps = {
  setWidth: (width: number) => void;
  width: number;
};

type SidebarActions = {
  collapse: () => ActionAny<SidebarState, ContainerProps>;
  expand: () => ActionAny<SidebarState, ContainerProps>;
  resize: (width: number) => ActionAny<SidebarState, ContainerProps>;
  setWidth: (width: number) => ActionAny<SidebarState, ContainerProps>;
};

const Store = createStore<SidebarState, SidebarActions>({
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

export const SidebarContainer = createContainer<SidebarState, SidebarActions, ContainerProps>(Store, {
  onInit: () => ({ setState }, { setWidth, width }) => {
    setWidth(width);
  },
});

export type SidebarOptions = {
  live?: boolean;
};

type UseSidebarState = Omit<SidebarState, 'liveWidth'>;

type UseSidebarArgs = Partial<{
  live: boolean;
}> | undefined;

export const useSidebar = createHook<SidebarState, SidebarActions, UseSidebarState, UseSidebarArgs>(Store, {
  selector: (state, { live } : SidebarOptions = { live: false }) => {
    const { liveWidth, width, ...sidebarState } = state;
    return live ? { ...sidebarState, width: liveWidth } : { ...sidebarState, width };
  },
});

export const useSidebarApi = createHook(Store, {
  selector: null,
});
