import React, { Suspense } from "react";
import { useRouter, Link } from "@atlaskit/router";
import {
  Grid,
  LeftPanel,
  Banner,
  Nav,
  LeftSidebar,
  RightPanel
} from "@atlaskit/page-layout";

import { ErrorBoundary } from "./error-boundary";

const RouteSidebar = () => {
  const [{ route }] = useRouter();
  // @ts-ignore
  if (!route.sidebar) return null;
  return (
    <aside>
      <ErrorBoundary>
        <Suspense fallback={"..."}>
          {/*
       // @ts-ignore */}
          <route.sidebar />
        </Suspense>
      </ErrorBoundary>
    </aside>
  );
};

const RouteComponent = () => {
  const [{ route }] = useRouter();
  return (
    <main>
      <ErrorBoundary>
        <Suspense fallback={"..."}>
          {/*
       // @ts-ignore */}
          <route.component />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export const Layout = () => {
  return (
    <Grid>
      <LeftPanel width="200px" isFixed>
        Left
      </LeftPanel>
      <Banner height="50px" isFixed>
        <Link href="/">Home</Link>
      </Banner>
      <Nav height="100px" isFixed>
        <RouteSidebar />
      </Nav>
      <LeftSidebar width="200px">Sidebar</LeftSidebar>
      <RightPanel width="200px" isFixed>
        Right
      </RightPanel>
      <main style={{ gridArea: "main" }}>
        <RouteComponent />
      </main>
    </Grid>
  );
};
