import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import whyDidYouRender from '@welldone-software/why-did-you-render';
import React from 'react';
import { hydrate } from 'react-dom';
// @ts-ignore
import { Router } from '@atlaskit/router';
import { createBrowserHistory } from 'history';
import cssVars from 'css-vars-ponyfill';

import { LegacyLayout, ModernLayout } from './layout';
import { routes } from './routes';

// @ts-ignore
const Layout = window.__LAYOUT__ === 'modern' ? ModernLayout : LegacyLayout;

whyDidYouRender(React);

hydrate(
    <Router
        // @ts-ignore
        routes={routes}
        history={createBrowserHistory()}
        resourceContext={{ baseUrl: '' }}
        // @ts-ignore
        resourceData={window.__INITIAL_STATE__}
    >
      <Layout/>
    </Router>,
    document.getElementById('root')
);

cssVars({
  exclude: 'link',
  watch: true,
});

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
