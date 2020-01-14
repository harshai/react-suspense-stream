import { useRouter } from '@atlaskit/router';
import React, { Suspense } from 'react';

import { LeftSidebar } from '../../@atlaskit/page-layout';
import { useSidebar } from '../controllers/use-sidebar';
import { ErrorBoundary } from './error-boundary';

export const Sidebar = () => {
  const [{ route }] = useRouter();
  const { collapse, expand, isCollapsed, } = useSidebar();
  const width = isCollapsed ? '50px' : '200px';
  const onClick = () => {
    if (isCollapsed) {
      expand();
    } else {
      collapse();
    }
  };

  // @ts-ignore
  if (!route.sidebar) return null;

  return (
      <LeftSidebar width={width} isFixed>
        <aside>
          <ErrorBoundary>
            <Suspense fallback={'...'}>
              {/*
                       // @ts-ignore */}
              <route.sidebar />
              <button type="button" onClick={onClick}>
                {isCollapsed ? 'Expand' : 'Collapse'}
              </button>
            </Suspense>
          </ErrorBoundary>
        </aside>
      </LeftSidebar>
  );
};

