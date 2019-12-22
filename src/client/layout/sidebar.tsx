import { useRouter } from '@atlaskit/router';
import { LeftSidebar } from '../../packages';
import { ErrorBoundary } from './error-boundary';
import React, { Suspense } from 'react';

export const Sidebar = () => {
  const [{ route }] = useRouter();
  // @ts-ignore
  if (!route.sidebar) return null;
  return (
      <LeftSidebar width="200px" isFixed>
        <aside>
          <ErrorBoundary>
            <Suspense fallback={'...'}>
              {/*
                       // @ts-ignore */}
              <route.sidebar/>
            </Suspense>
          </ErrorBoundary>
        </aside>
      </LeftSidebar>
  );
};

