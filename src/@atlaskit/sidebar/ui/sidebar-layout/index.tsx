/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/core';
import { SidebarContainer, useSidebar } from '../../controllers/use-sidebar';
import { ResizeControl } from '../resize-control';
import { sidebarCSS, sidebarContentCSS } from './styles';

export type SidebarLayoutProps = {
  children: ReactNode;
  onWidthChange: (width: number) => void;
  width: number;
};

export const SidebarLayout = ({ children, onWidthChange, width }: SidebarLayoutProps) => {
  const [{ expandedWidth, isCollapsed }] = useSidebar();
  console.log('rendering sidebar layout...');
  return (
      <SidebarContainer isGlobal setWidth={onWidthChange} width={width}>
        <aside css={sidebarCSS(isCollapsed, expandedWidth)}>
          <div css={sidebarContentCSS}>
            {children}
          </div>
          <ResizeControl />
        </aside>
      </SidebarContainer>
  );
};
