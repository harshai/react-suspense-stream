import { settingsSidebarResource } from './resources';
import { SettingsComponent } from './components/main';
import { SettingsSidebar } from './components/sidebar';

export const settingsRoute = {
  name: 'settings',
  path: `/settings`,
  component: SettingsComponent,
  sidebar: SettingsSidebar,
  resources: [settingsSidebarResource],
  exact: true,
};
