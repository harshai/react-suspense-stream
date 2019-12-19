import React from 'react';
import { useResource } from '@atlaskit/router';

import { projectSidebarResource } from '../resources';

export const ProjectSidebar = () => {
  const [{ data, error, promise }] = useResource(projectSidebarResource);
  if (!data && !error && promise) {
    throw promise;
  }

  // needed due to batchedUpdates fix missing in router
  if (!data) return null;

  return (
    <div>
      <strong>Sidebar</strong>
      <ul>
        {(data as any).items.map((itm: any) => (
          <li key={itm}>{itm}</li>
        ))}
      </ul>
    </div>
  );
};
