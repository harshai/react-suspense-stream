import { useRouter } from '@atlaskit/router';
import React, { Suspense, useState } from 'react';

import { LeftSidebar } from '../../@atlaskit/page-layout';
import { ErrorBoundary } from './error-boundary';

export const Sidebar = () => {
  const [{ route }] = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const width = isCollapsed ? '50px' : '200px';
  const onClick = () => {
    setIsCollapsed(!isCollapsed);
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

