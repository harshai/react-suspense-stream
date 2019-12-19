import { createResource } from '@atlaskit/router';

export const projectResource = createResource({
  type: 'PROJECT',
  getKey: () => 'state',
  // @ts-ignore
  getData: async ({ match }, { baseUrl }) => {
    const resp = await fetch(`${baseUrl}/api/projects/${match.params.id}`);
    const data = await resp.json();
    return data;
  },
});

export const projectSidebarResource = createResource({
  type: 'SIDEBAR',
  getKey: () => 'state',
  // @ts-ignore
  getData: async (_, { baseUrl }) => {
    const resp = await fetch(`${baseUrl}/api/sidebar/projects`);
    const data = await resp.json();
    return data;
  },
});
