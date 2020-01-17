/** @jsx jsx */
import { ReactNode, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { jsx } from '@emotion/core';
import { SidebarContainer, useSidebar } from '../../controllers/use-sidebar';
import { ResizeControl } from '../resize-control';
import { sidebarCSS, sidebarContentCSS } from './styles';

export type SidebarLayoutProps = {
  children: ReactNode;
  onWidthChange: (width: number) => void;
  width: number;
};

// TODO another sidebar selector
export const SidebarLayout = ({ children, onWidthChange, width }: SidebarLayoutProps) => {
  const flyoutId = useRef<number>();
  // const [{ collapsedWidth, expandedWidth, isFlyoutOpen }, { flyin, flyout }] = useSidebar();
  console.log('sidebar layout render...');
  const onMouseEnter = () => {
  //   clearTimeout(flyoutId.current);
  //   flyoutId.current = setTimeout(() => {
  //     flyout();
  //   }, 350);
  };

  const onMouseLeave = () => {
  //   clearTimeout(flyoutId.current);
  //   flyin();
  };

  return (
      <SidebarContainer isGlobal setWidth={onWidthChange} width={width}>
        {/*<Transition in={isFlyoutOpen} timeout={500}>*/}
        {/*  {state => (*/}
              <aside css={sidebarCSS('unmounted', 20, 200)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <div css={sidebarContentCSS}>
                  {children}
                </div>
                <ResizeControl onWidthChange={onWidthChange} />
              </aside>
          {/*)}*/}
        {/*</Transition>*/}
      </SidebarContainer>
  );
};
