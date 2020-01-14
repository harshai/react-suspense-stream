/** @jsx jsx */
import { ReactNode, useEffect, useRef, useState } from 'react';
import { jsx, Global, css } from '@emotion/core';
// Emotion lack grid support: https://github.com/emotion-js/emotion/issues/1617

type SlotProps = {
  children: ReactNode;
  height?: string;
  width?: string;
  isFixed?: boolean;
};

const Banner = (props: SlotProps) => {
  const { children, height, isFixed } = props;
  const styles = {
    background: 'red',
    height: 'inherit',
    position: 'fixed',
    width: 'inherit',
  };
  const fixedStyles = isFixed ? styles : {};
  const bannerStyles = {
    gridArea: 'banner',
    background: 'red',
    height: 'var(--bannerHeight)',
    msGridColumn: 2,
    msGridColumnSpan: 3,
    msGridRow: 1,
    width: 'calc(100% - var(--leftPanelWidth) - var(--rightPanelWidth))',
  };
  return (
      <div css={bannerStyles}>
        <div css={fixedStyles}>
          <Global
              styles={css`
          :root {
            --bannerHeight: ${height};
          }
        `}
          />
          {children}
        </div>
      </div>
  );
};

const Nav = (props: SlotProps) => {
  const { children, height, isFixed } = props;
  const styles = {
    background: 'blue',
    height: 'inherit',
    position: 'fixed',
    width: 'inherit',
  };
  const fixedStyles = isFixed ? styles : {};
  const navStyles = {
    gridArea: 'nav',
    background: 'blue',
    height: 'var(--navHeight)',
    msGridColumn: 2,
    msGridColumnSpan: 3,
    msGridRow: 2,
    // TODO check 100% in IE11 without it blowing up
    width: 'calc(100% - var(--leftPanelWidth) - var(--rightPanelWidth))',
  };

  return (
      <div css={navStyles}>
        <div css={fixedStyles}>
          <Global
              styles={css`
          :root {
            --navHeight: ${height};
          }
        `}
          />
          {children}
        </div>
      </div>
  );
};

const Main = (props: { children: ReactNode }) => {
  const { children } = props;
  const mainStyles = {
    background: 'purple',
    gridArea: 'main',
    msGridColumn: 3,
    msGridRow: 3,
  };

  return (
      <div css={mainStyles}>
        {children}
      </div>
  );
};

type LeftSidebarTransitionProps = {
  width?: string;
};

const usePrevious = (value: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

const toNumber = (value: string) => parseInt(value.replace('px', ''), 10);

const LeftSidebarTransition = (props: LeftSidebarTransitionProps) => {
  const { width } = props;
  const stylesRef = useRef(null);
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(width);
  const prevWidth = usePrevious(leftSidebarWidth);

  useEffect(() => {
    // if (prevWidth && (width !== prevWidth || leftSidebarWidth !== width)) {
    if (prevWidth && (width !== prevWidth)) {
      const prevWidthValue = toNumber(prevWidth! as string);
      const widthValue = toNumber(width! as string);
      // const leftSidebarWidthValue = toNumber(leftSidebarWidth! as string);
      // if (widthValue < prevWidthValue) {
      //   setLeftSidebarWidth(`${Math.max(leftSidebarWidthValue - 5, widthValue)}px`);
      // } else {
      //   setLeftSidebarWidth(`${Math.min(leftSidebarWidthValue + 5, widthValue)}px`);
      // }
      const duration = 100;
      const now = Date.now();
      const start = performance.now();
      const distance = Math.abs(prevWidthValue - widthValue);
      const transition = (timestamp: number) => {
        const delta = timestamp - start;
        const progress = Math.min(delta / duration, 1);
        const position = distance * progress;
        let currentWidth;
        if (widthValue < prevWidthValue) {
          currentWidth = Math.round(Math.max(prevWidthValue - position, widthValue));
        } else {
          currentWidth = Math.round(Math.min(prevWidthValue + position, widthValue));
        }

        stylesRef.current.innerHTML = `
            :root {
              --leftSidebarWidth: ${currentWidth}px;
            }
          `;

        if (delta < duration) {
          requestAnimationFrame(transition);
        } else {
          console.log('Took', Date.now() -  now);
          setLeftSidebarWidth(width);
        }
      };

      requestAnimationFrame(transition);
    }
  }, [prevWidth, width]);

  // return (
  //     <Global
  //         styles={css`
  //         :root {
  //           --leftSidebarWidth: ${leftSidebarWidth};
  //         }
  //       `}
  //     />
  // );

  const rules = `
    :root {
      --leftSidebarWidth: ${leftSidebarWidth};
    }
  `;

  return (
      <style ref={stylesRef} dangerouslySetInnerHTML={{ __html: rules }} />
  );
};

const LeftSidebar = (props: SlotProps) => {
  const { children, width, isFixed } = props;
  const styles = {
    position: 'fixed',
    background: 'green',
    top: 'calc(var(--bannerHeight) + var(--navHeight))',
    left: 'var(--leftPanelWidth)',
    bottom: 0,
    width: 'inherit',
  };
  const fixedStyles = isFixed ? styles : {};
  const leftSidebarStyles = {
    gridArea: 'left-sidebar',
    background: 'green',
    msGridColumn: 2,
    msGridRow: 3,
    width: 'var(--leftSidebarWidth)',
    height: 'calc(100vh - var(--bannerHeight) - var(--navHeight))',
  };

  return (
      <div css={leftSidebarStyles}>
        <div css={fixedStyles}>
          <LeftSidebarTransition width={width}/>
          {children}
        </div>
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

const RightPanel = (props: SlotProps) => {
  const { children, width } = props;
  const rightPanelStyles = {
    gridArea: 'right-panel',
    background: 'grey',
    msGridColumn: 5,
    msGridRow: 1,
    msGridRowSpan: 3,
  };

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

const Grid = (props: SlotProps) => {
  const { children } = props;

  const areas = `"left-panel banner banner banner right-panel"
                 "left-panel nav nav nav right-panel"
                 "left-panel left-sidebar main right-sidebar right-panel"`;
  const gridStyles = css`
    display: -ms-grid;
    display: grid;
    background: orange;
    height: 100vh;
    grid-template-columns: var(--leftPanelWidth) var(--leftSidebarWidth) auto var(--rightSidebarWidth) var(--rightPanelWidth);
    -ms-grid-columns: var(--leftPanelWidth) var(--leftSidebarWidth) max-content var(--rightSidebarWidth) var(--rightPanelWidth);
    grid-template-rows: var(--bannerHeight) var(--navHeight) auto;
    -ms-grid-rows: var(--bannerHeight) var(--navHeight) max-content;
    grid-template-areas: ${areas};
  `;

  return (
      <div css={gridStyles}>
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

export { Banner, Nav, LeftPanel, Main, RightPanel, LeftSidebar, RightSidebar, Grid };