import React from 'react';
import { useResource } from '@atlaskit/router';

import { settingsSidebarResource } from '../resources';

export const SettingsSidebar = () => {
  const [{ data, error, promise }] = useResource(settingsSidebarResource);
  if (!data && !error && promise) {
    throw promise;
  }

  // needed due to batchedUpdates fix missing in router
  if (!data) return null;

  return (
    <div>
      <ul>
        {(data as any).items.map((itm: any) => (
          <li key={itm}>{itm}</li>
        ))}
      </ul>
    </div>
  );
};
