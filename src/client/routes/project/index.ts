import { projectResource, projectSidebarResource } from './resources';
import { ProjectComponent } from './components/main';
import { ProjectSidebar } from './components/sidebar';

export const projectRoute = {
  name: 'project',
  path: `/projects/:id`,
  component: ProjectComponent,
  sidebar: ProjectSidebar,
  resources: [projectResource, projectSidebarResource],
};
