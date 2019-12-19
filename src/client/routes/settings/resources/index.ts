import { createResource } from '@atlaskit/router';

export const settingsSidebarResource = createResource({
  type: 'SETTINGS',
  getKey: () => 'state',
  // @ts-ignore
  getData: async (_, { baseUrl }) => {
    const resp = await fetch(`${baseUrl}/api/sidebar/settings`);
    const data = await resp.json();
    return data;
  },
});
