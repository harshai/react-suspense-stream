import React from 'react';
import { useResource } from '@atlaskit/router';

import { sidebarResource } from '../../resources';

const ProjectSidebar = () => {
  const [{ data, error, promise }] = useResource(sidebarResource);
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

export default ProjectSidebar;
