import { ActionAny, createHook, createStore } from 'react-sweet-state';
import { RefObject } from 'react';

type PageLayoutState = {
  mainRef: RefObject<HTMLElement> | undefined;
  sidebarRef: RefObject<HTMLElement> | undefined;
  sidebarWidth: number;
  initialWidth: number;
};

type PageLayoutActions = {
  setMainRef: (mainRef: RefObject<HTMLElement>) => ActionAny<PageLayoutState>;
  setSidebarRef: (sidebarRef: RefObject<HTMLElement>) => ActionAny<PageLayoutState>;
  setSidebarWidth: (width: number) => ActionAny<PageLayoutState>;
};

const Store = createStore<PageLayoutState, PageLayoutActions>({
  initialState: {
    mainRef: undefined,
    sidebarRef: undefined,
    sidebarWidth: 0,
    initialWidth: 0
  },
  actions: {
    setMainRef: (mainRef: RefObject<HTMLElement>) => ({ setState }) => {
      setState({ mainRef });
    },
    setSidebarRef: (sidebarRef: RefObject<HTMLElement>) => ({ setState }) => {
      setState({ sidebarRef });
    },
    setSidebarWidth: (width: number) => ({ getState, setState }) => {
      const { mainRef, sidebarRef, initialWidth } = getState();

      if (sidebarRef && sidebarRef.current) {
        sidebarRef.current.style.width = `${width}px`;
      }

      if (mainRef && mainRef.current) {
        mainRef.current.style.paddingLeft = `${width}px`;
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
