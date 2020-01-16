import { createHook, createStore } from 'react-sweet-state';
import { RefObject } from 'react';

const Store = createStore({
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
