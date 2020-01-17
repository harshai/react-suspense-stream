import { createContainer, createHook, createStore } from 'react-sweet-state';
import { animate } from '../ui/resize-control/utils';

const Store = createStore({
  initialState: {
    collapsedWidth: 25,
    expandedWidth: 250,
    isCollapsed: false,
    isFlyoutOpen: false,
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
        },
        to: expandedWidth,
      });
    },
    flyin: () => ({ getState, setState }) => {
      const { collapsedWidth, isCollapsed, width } = getState();
      if (isCollapsed) {
        setState({
          isFlyoutOpen: false,
        });
        // animate({
        //   from: width,
        //   setWidth: (currentWidth: number) => {
        //     setState({
        //       width: currentWidth,
        //     });
        //   },
        //   to: collapsedWidth,
        // });
      }
    },
    flyout: () => ({ getState, setState }) => {
      const { expandedWidth, isCollapsed, width } = getState();
      if (isCollapsed) {
        setState({
          isFlyoutOpen: true,
        });
        // animate({
        //   from: width,
        //   setWidth: (currentWidth: number) => {
        //     setState({
        //       width: currentWidth,
        //     });
        //   },
        //   to: expandedWidth,
        // });
      }
    },
    setWidth: (width: number) => ({ getState, setState }, { setWidth }) => {
      const { isCollapsed, width: currentWidth } = getState();
      if (!isCollapsed && currentWidth !== width) {
        setWidth(width);
        setState({
          expandedWidth: width,
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

export const useSidebar = createHook(Store);

export const useSidebarApi = createHook(Store, {
  selector: null,
});


// Selectors for live updates and committed only