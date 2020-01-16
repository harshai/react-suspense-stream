import { useRouter } from '@atlaskit/router';
import React, { Suspense } from 'react';

import { LeftSidebar, usePageLayoutApi } from '../../@atlaskit/page-layout';
import { SidebarLayout } from '../../@atlaskit/sidebar';
import { ErrorBoundary } from './error-boundary';

export const Sidebar = () => {
  const [, { setSidebarWidth }] = usePageLayoutApi();
  const [{ route }] = useRouter();
  console.log('rendering sidebar...');

  setSidebarWidth(250);

  // @ts-ignore
  if (!route.sidebar) return null;

  return (
      <LeftSidebar isFixed>
        <SidebarLayout>
          <ErrorBoundary>
            <Suspense fallback={'...'}>
              {/*
                       // @ts-ignore */}
              <route.sidebar />
            </Suspense>
          </ErrorBoundary>
        </SidebarLayout>
      </LeftSidebar>
  );
};
