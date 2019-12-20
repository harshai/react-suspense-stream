/** @jsx jsx */
import {
  Grid,
  Banner,
  RightPanel
} from '../../@atlaskit/page-layout';
import { jsx, Global } from '@emotion/core';

import { Content } from './content';
import { Navigation } from './navigation';
import { Sidebar } from './sidebar';

const globalStyles = {
  'html, body': {
    margin: 0,
  },
};

const pageBodyStyles = {
  // display: 'flex',
  minWidth: 'fit-content',

  // In jira-frontend:
  display: 'initial',
};

const navigationAppStyles = {
  order: 1,
  flex: 'initial',
  position: 'relative',
  // zIndex: 300,

  // In jira-frontend:
  zIndex: 'auto',
} as const;

const contentStyles = {
  flex: 1,
  order: 2,
  margin: '0 40px',
  padding: 0,
  // position: 'relative',

  background: 'purple',

  // In jira-frontend:
  position: 'absolute',
  left: 'var(--leftSidebarWidth)',
  top: 'calc(var(--bannerHeight) + var(--navHeight))',
  right: 'var(--rightPanelWidth)',
} as const;

export const LegacyLayout = () => {
  return (
      <div id="page-body" css={pageBodyStyles}>
        <Global styles={globalStyles}/>
        <div id="navigation-app" css={navigationAppStyles}>
          <Grid>
            <Banner height="50px" isFixed>
              Banner
            </Banner>
            <Navigation layoutType='legacy'/>
            <Sidebar/>
            <RightPanel width="200px" isFixed>
              Right
            </RightPanel>
          </Grid>
        </div>
        <div id="content" css={contentStyles}>
          <Content/>
        </div>
      </div>
  );
};
