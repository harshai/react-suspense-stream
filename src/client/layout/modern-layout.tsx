import React from 'react';
import {
  BannerLayout,
  ContentLayout,
  MainLayout,
  PageLayout,
  RightPanelLayout,
} from '../../@atlaskit/page-layout';
import { Global } from '@emotion/core';

import { Content } from './content';
import { Navigation } from './navigation';
import { Sidebar } from './sidebar';

const globalStyles = {
  'html, body': {
    margin: 0,
  },
};

export const ModernLayout = () => {
  return (
      <div>
        <Global styles={globalStyles}/>
        <PageLayout>
          <BannerLayout height="50px" isFixed>
            Banner
          </BannerLayout>
          <Navigation layoutType='modern'/>
          <ContentLayout>
            <Sidebar/>
            <MainLayout>
              <Content/>
            </MainLayout>
          </ContentLayout>
          <RightPanelLayout width="200px">
            Right
          </RightPanelLayout>
        </PageLayout>
      </div>
  );
};
