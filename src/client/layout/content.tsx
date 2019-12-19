import { useRouter } from '@atlaskit/router';
import { ErrorBoundary } from './error-boundary';
import React, { Suspense } from 'react';

const scrollStyles = {
  display: 'flex',
  flexDirection: 'column-reverse',
  height: '1000px',
} as const;

export const Content = () => {
  const [{ route }] = useRouter();
  return (
      <ErrorBoundary>
        <Suspense fallback={'...'}>
          {/*
       // @ts-ignore */}
          <route.component/>
          <div style={scrollStyles}>Scroll</div>
        </Suspense>
      </ErrorBoundary>
  );
};
