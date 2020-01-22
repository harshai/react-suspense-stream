// @ts-nocheck
import { NavigationLayout } from '../../@atlaskit/page-layout';
import { Link } from '@atlaskit/router';
import React, { ComponentProps } from 'react';

const height = '56px';

const navigationStyles = {
  alignItems: 'center',
  display: 'flex',
  height,
  margin: '0 0.5rem',
};

const linkStyles = {
  color: 'white',
  margin: '0.5rem',
  textDecoration: 'none',
};

type LayoutType = 'legacy' | 'modern';

// Simulate SPA transition or full page reload based on the route and layout type
const NavLink = (props: ComponentProps<typeof Link> & { isLegacy?: boolean, layoutType: LayoutType }) => {
  const { isLegacy: isLegacyLink, layoutType, ...linkProps } = props;
  const isLegacyPage = layoutType === 'legacy';

  return isLegacyLink || isLegacyPage
    ? <a {...linkProps} style={linkStyles} />
    : <Link {...linkProps} style={linkStyles}/>;
};

export const Navigation = (props: { layoutType: LayoutType }) => (
    <NavigationLayout height={height} isFixed>
      <nav style={navigationStyles}>
        <NavLink {...props} href="/">Home</NavLink>
        <NavLink {...props} href="/settings" isLegacy>Settings</NavLink>
      </nav>
    </NavigationLayout>
);
