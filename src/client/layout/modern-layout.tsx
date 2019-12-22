import React from 'react';
import {
  Grid,
  Banner,
  RightPanel
} from '../../packages';
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
        <Grid>
          <Banner height="50px" isFixed>
            Banner
          </Banner>
          <Navigation layoutType='modern'/>
          <Sidebar/>
          <main style={{ gridArea: 'main' }}>
            <Content/>
          </main>
          <RightPanel width="200px" isFixed>
            Right
          </RightPanel>
        </Grid>
      </div>
  );
};
