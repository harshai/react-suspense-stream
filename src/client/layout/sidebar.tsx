import { useRouter } from '@atlaskit/router';
import React, { Suspense } from 'react';

import { LeftSidebarLayout, usePageLayoutApi } from '../../@atlaskit/page-layout';
import { SidebarLayout } from '../../@atlaskit/sidebar';
import { ErrorBoundary } from './error-boundary';

export const Sidebar = () => {
  const [, { setSidebarWidth }] = usePageLayoutApi();
  const [{ route }] = useRouter();
  console.log('rendering sidebar...');

  // @ts-ignore
  if (!route.sidebar) return null;

  return (
      <LeftSidebarLayout isFixed>
        <SidebarLayout width={250} onWidthChange={setSidebarWidth}>
          <ErrorBoundary>
            <Suspense fallback={'...'}>
              {/*
                       // @ts-ignore */}
              <route.sidebar />
            </Suspense>
          </ErrorBoundary>
        </SidebarLayout>
      </LeftSidebarLayout>
  );
};
