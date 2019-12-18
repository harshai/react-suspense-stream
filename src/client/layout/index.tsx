import React, { Suspense } from 'react';
import { useRouter, Link } from '@atlaskit/router';
import {
  Grid,
  Banner,
  Nav,
  LeftSidebar,
  RightPanel
} from '@atlaskit/page-layout';
import { Global } from '@emotion/core';

import { ErrorBoundary } from './error-boundary';

const RouteSidebar = () => {
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

const RouteComponent = () => {
  const [{ route }] = useRouter();
  return (
      <main>
        <ErrorBoundary>
          <Suspense fallback={'...'}>
            {/*
       // @ts-ignore */}
            <route.component/>
          </Suspense>
        </ErrorBoundary>
      </main>
  );
};

const globalStyles = {
  'html, body': {
    margin: 0,
  },
};

export const Layout = () => {
  return (
      <div>
        <Global styles={globalStyles} />
        <Grid>
          <Banner height="50px" isFixed>
            <Link href="/">Home</Link>
          </Banner>
          <Nav height="100px" isFixed>
            Top navigation
          </Nav>
          <RouteSidebar/>
          <main style={{ gridArea: 'main' }}>
            <RouteComponent/>
          </main>
          <RightPanel width="200px" isFixed>
            Right
          </RightPanel>
        </Grid>
      </div>
  );
};
