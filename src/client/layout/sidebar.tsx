import { useRouter } from '@atlaskit/router';
import React, { Suspense } from 'react';

import { LeftSidebar } from '../../@atlaskit/page-layout';
import { SidebarLayout, useSidebar } from '../../@atlaskit/sidebar';
import { ErrorBoundary } from './error-boundary';

export const Sidebar = () => {
  const [{ route }] = useRouter();
  const [{ width }] = useSidebar();

  // @ts-ignore
  if (!route.sidebar) return null;

  return (
      <LeftSidebar width={`${width}px`} isFixed>
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

