/** @jsx jsx */
import { ReactNode, useEffect, useRef } from 'react';
import { jsx, Global, css } from '@emotion/core';
import { usePageLayout, usePageLayoutApi } from '../controllers/use-page-layout';
// Emotion lack grid support: https://github.com/emotion-js/emotion/issues/1617

type SlotProps = {
  children: ReactNode;
  height?: string;
  width?: string;
  isFixed?: boolean;
};

export const BannerLayout = (props: SlotProps) => {
  const { children, height } = props;

  const bannerStyles = {
    background: 'red',
    height: 'var(--bannerHeight)',
    position: 'fixed',
    width: 'calc(100% - var(--leftPanelWidth) - var(--rightPanelWidth))',
  } as const;

  return (
      <div css={bannerStyles}>
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

const contentCSS = {
  display: 'flex',
  width: 'calc(100% - var(--rightPanelWidth))',
};

export const ContentLayout = ({ children }: { children: ReactNode }) => (
    <div css={contentCSS}>
      {children}
    </div>
);

export const NavigationLayout = (props: SlotProps) => {
  const { children, height } = props;

  const navigationStyles = {
    background: 'blue',
    height: 'var(--navHeight)',
    position: 'fixed',
    top: 'var(--bannerHeight)',
    // TODO check 100% in IE11 without it blowing up
    width: 'calc(100% - var(--leftPanelWidth) - var(--rightPanelWidth))',
  } as const;

  return (
      <div css={navigationStyles}>
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

export const MainLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const mainRef = useRef(null);
  const [, { setMainRef }] = usePageLayoutApi();

  const mainStyles = {
    background: 'purple',
    boxSizing: 'border-box',
    paddingLeft: 'var(--leftSidebarWidth)',
    paddingRight: 'var(--rightPanelWidth)',
    paddingTop: 'calc(var(--bannerHeight) + var(--navHeight))',
    width: '100%',
  } as const;

  useEffect(() => {
    setMainRef(mainRef);
  }, []);

  return (
      <div css={mainStyles} ref={mainRef}>
        {children}
      </div>
  );
};

const LeftSidebarTransition = () => {
  const [{ leftSidebarWidth }] = usePageLayout();
  console.log('rendering sidebar transition...');

  return (
      <Global
          styles={css`
          :root {
            --leftSidebarWidth: ${leftSidebarWidth}px;
          }
        `}
      />
  );
};

export const LeftSidebarLayout = (props: SlotProps) => {
  const { children, width } = props;
  const sidebarRef = useRef(null);
  const [, { setSidebarRef }] = usePageLayoutApi();

  const leftSidebarStyles = {
    background: 'green',
    bottom: 0,
    position: 'fixed',
    top: 'calc(var(--bannerHeight) + var(--navHeight))',
    left: 'var(--leftPanelWidth)',
    width: 'var(--leftSidebarWidth)',
  } as const;

  useEffect(() => {
    setSidebarRef(sidebarRef);
  }, []);

  return (
      <div css={leftSidebarStyles} ref={sidebarRef}>
        {children}
        <LeftSidebarTransition/>
      </div>
  );
};

export const RightSidebarLayout = (props: SlotProps) => {
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
    msGridColumn: 4,
    msGridRow: 3,
    ...fixedStyles,
  };

  return (
      <div css={rightSideBarStyles}>
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

export const LeftPanelLayout = (props: SlotProps) => {
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
    msGridColumn: 1,
    msGridRow: 1,
    msGridRowSpan: 3,
    ...fixedStyles,
  };

  return (
      <div css={leftPanelStyles}>
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

export const RightPanelLayout = (props: SlotProps) => {
  const { children, width } = props;
  const rightPanelStyles = {
    background: 'grey',
    bottom: 0,
    left: 'calc(100% - var(--rightPanelWidth))',
    position: 'fixed',
    right: 0,
    top: 0,
  } as const;

  return (
      <div css={rightPanelStyles}>
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

const pageLayoutCSS = {
  background: 'orange',
  position: 'relative',
  height: '100vh',
} as const;

export const PageLayout = (props: SlotProps) => {
  const { children } = props;

  return (
      <div css={pageLayoutCSS}>
        <Global
            styles={css`
          :root {
            --leftPanelWidth: 0px;
            --leftSidebarWidth: 0px;
            --rightSidebarWidth: 0px;
            --rightPanelWidth: 0px;
            --navHeight: 0px;
            --bannerHeight: 0px;
          }
        `}
        />
        {children}
      </div>
  );
};
