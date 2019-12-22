/** @jsx jsx */
import React from 'react';
import { jsx, Global, css } from '@emotion/core';

type SlotProps = {
  children: React.ReactNode;
  height?: string;
  width?: string;
  isFixed?: boolean;
};

const Banner = (props: SlotProps) => {
  const { children, height, isFixed } = props;
  const styles = {
    position: 'fixed',
    top: 0,
    left: 'var(--leftPanelWidth)',
    bottom: 'calc(100vh - var(--bannerHeight))',
    right: 'var(--rightPanelWidth)',
  };
  const fixedStyles = isFixed ? styles : {};
  const bannerStyles = {
    gridArea: 'banner',
    background: 'red',
    ...fixedStyles,
  };
  return (
    <div style={bannerStyles}>
      <Global
        styles={css`
          :root {
            --bannerHeight: ${height};
          }
        `}
      />
      {children}
    </div>
  );
};

const Nav = (props: SlotProps) => {
  const { children, height, isFixed } = props;
  const styles = {
    position: 'fixed',
    top: 'var(--bannerHeight)',
    left: 'var(--leftPanelWidth)',
    bottom: 'calc(100vh - var(--bannerHeight) - var(--navHeight))',
    right: 'var(--rightPanelWidth)',
  };
  const fixedStyles = isFixed ? styles : {};
  const navStyles = {
    gridArea: 'nav',
    background: 'blue',
    ...fixedStyles,
  };

  return (
    <div style={navStyles}>
      <Global
        styles={css`
          :root {
            --navHeight: ${height};
          }
        `}
      />
      {children}
    </div>
  );
};

const LeftSidebar = (props: SlotProps) => {
  const { children, width, isFixed } = props;
  const styles = {
    position: 'fixed',
    top: 'calc(var(--bannerHeight) + var(--navHeight))',
    left: 'var(--leftPanelWidth)',
    bottom: 0,
    width: 'var(--leftSidebarWidth)',
  };
  const fixedStyles = isFixed ? styles : {};
  const leftSidebarStyles = {
    gridArea: 'left-sidebar',
    background: 'green',
    ...fixedStyles,
  };

  return (
    <div style={leftSidebarStyles}>
      <Global
        styles={css`
          :root {
            --leftSidebarWidth: ${width};
          }
        `}
      />
      {children}
    </div>
  );
};

const RightSidebar = (props: SlotProps) => {
  const { children, width, isFixed } = props;
  const styles = {
    position: 'fixed',
    top: 'calc(var(--bannerHeight) + var(--navHeight))',
    right: 'var(--rightPanelWidth)',
    bottom: 0,
    width: 'var(--rightSidebarWidth)',
  };
  const fixedStyles = isFixed ? styles : {};
  const rightSideBarStyles = {
    gridArea: 'right-sidebar',
    background: 'green',
    ...fixedStyles,
  };

  return (
    <div style={rightSideBarStyles}>
      <Global
        styles={css`
          :root {
            --rightSidebarWidth: ${width};
          }
        `}
      />
      {children}
    </div>
  );
};

const LeftPanel = (props: SlotProps) => {
  const { children, width, isFixed } = props;
  const styles = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: 'var(--leftPanelWidth)',
  };
  const fixedStyles = isFixed ? styles : {};
  const leftPanelStyles = {
    gridArea: 'left-panel',
    background: 'grey',
    ...fixedStyles,
  };

  return (
    <div style={leftPanelStyles}>
      <Global
        styles={css`
          :root {
            --leftPanelWidth: ${width};
          }
        `}
      />
      {children}
    </div>
  );
};

const RightPanel = (props: SlotProps) => {
  const { children, width } = props;
  const rightPanelStyles = {
    gridArea: 'right-panel',
    background: 'grey',
  };

  return (
    <div style={rightPanelStyles}>
      <Global
        styles={css`
          :root {
            --rightPanelWidth: ${width};
          }
        `}
      />
      {children}
    </div>
  );
};

const Grid = (props: SlotProps) => {
  const { children } = props;

  const areas = `"left-panel banner banner banner right-panel"
                 "left-panel nav nav nav right-panel"
                 "left-panel left-sidebar main right-sidebar right-panel"`;
  const gridStyles = {
    display: 'grid',
    height: '100vh',
    gridTemplateColumns: `var(--leftPanelWidth) var(--leftSidebarWidth) auto var(--rightSidebarWidth) var(--rightPanelWidth)`,
    gridTemplateRows: `var(--bannerHeight) var(--navHeight) auto`,
    gridTemplateAreas: areas,
  };

  return (
    <div style={gridStyles}>
      <Global
        styles={css`
          :root {
            --leftPanelWidth: 0;
            --leftSidebarWidth: 0;
            --rightSidebarWidth: 0;
            --rightPanelWidth: 0;
            --navHeight: 0;
            --bannerHeight: 0;
          }
        `}
      />
      {children}
    </div>
  );
};

export { Banner, Nav, LeftPanel, RightPanel, LeftSidebar, RightSidebar, Grid };
