import React, { useState } from 'react';
import Popup from '@atlaskit/popup';
import { useResource } from '@atlaskit/router';

import { projectSidebarResource } from '../resources';

export const ProjectSidebar = () => {
  const [{ data, error, promise }] = useResource(projectSidebarResource);
  const [isOpen, setIsOpen] = useState(false);

  if (!data && !error && promise) {
    throw promise;
  }

  // needed due to batchedUpdates fix missing in router
  if (!data) return null;

  return (
    <div>
      <strong>Sidebar</strong>
      <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          content={() => (
              <div>Yo yo yo</div>
          )}
          trigger={triggerProps => (
              <button
                  {...triggerProps}
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
              >
                {isOpen ? 'Close' : 'Open'} Popup
              </button>
          )}
      />
      <ul>
        {(data as any).items.map((itm: any) => (
          <li key={itm}>{itm}</li>
        ))}
      </ul>
    </div>
  );
};
