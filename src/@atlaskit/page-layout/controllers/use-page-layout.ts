import { ActionAny, createHook, createStore } from 'react-sweet-state';
import { RefObject } from 'react';

type PageLayoutState = {
  sidebarRef: RefObject<HTMLStyleElement> | undefined;
  sidebarWidth: number;
  initialWidth: number;
};

type PageLayoutActions = {
  setSidebarRef: (sidebarRef: RefObject<HTMLStyleElement>) => ActionAny<PageLayoutState>;
  setSidebarWidth: (width: number) => ActionAny<PageLayoutState>;
};

const Store = createStore<PageLayoutState, PageLayoutActions>({
  initialState: {
    sidebarRef: undefined,
    sidebarWidth: 0,
    initialWidth: 0
  },
  actions: {
    setSidebarRef: (sidebarRef: RefObject<HTMLStyleElement>) => ({ setState }) => {
      setState({ sidebarRef });
    },
    setSidebarWidth: (width: number) => ({ getState, setState }) => {
      const { sidebarRef, initialWidth } = getState();

      if (sidebarRef && sidebarRef.current) {
        sidebarRef.current.innerHTML = `
           :root {
              --leftSidebarWidth: ${width}px;
           }
        `;
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
