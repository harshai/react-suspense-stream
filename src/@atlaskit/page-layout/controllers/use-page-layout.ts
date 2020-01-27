import { ActionAny, createHook, createStore } from 'react-sweet-state';
import { RefObject } from 'react';

type PageLayoutState = {
  sidebarRef: RefObject<HTMLElement> | undefined;
  sidebarWidth: number;
  initialWidth: number;
};

type PageLayoutActions = {
  setSidebarRef: (sidebarRef: RefObject<HTMLElement>) => ActionAny<PageLayoutState>;
  setSidebarWidth: (width: number) => ActionAny<PageLayoutState>;
};

const Store = createStore<PageLayoutState, PageLayoutActions>({
  initialState: {
    sidebarRef: undefined,
    sidebarWidth: 0,
    initialWidth: 0
  },
  actions: {
    setSidebarRef: (sidebarRef: RefObject<HTMLElement>) => ({ setState }) => {
      setState({ sidebarRef });
    },
    setSidebarWidth: (width: number) => ({ getState, setState }) => {
      const { sidebarRef, initialWidth } = getState();

      if (sidebarRef && sidebarRef.current) {
        sidebarRef.current.style.width = `${width}px`;
      }

      setState({
        sidebarWidth: width,
        initialWidth: initialWidth || width
      });
    },
  },
  name: '@atlaskit/page-layout',
});

export const usePageLayout = createHook(Store, {
  selector: ({ initialWidth, sidebarWidth }) => {
    return {
      leftSidebarWidth: initialWidth || sidebarWidth,
    };
  }
});

export const usePageLayoutApi = createHook(Store, {
  selector: null,
});
