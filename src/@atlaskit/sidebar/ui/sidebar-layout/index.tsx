/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/core';
import { SidebarContainer } from '../../controllers/use-sidebar';
import { ResizeControl } from '../resize-control';
import { sidebarCSS, sidebarContentCSS } from './styles';

export type SidebarLayoutProps = {
  children: ReactNode;
  onWidthChange: (width: number) => void;
  width: number;
};

export const SidebarLayout = ({ children, onWidthChange, width }: SidebarLayoutProps) => {
  return (
      <SidebarContainer isGlobal setWidth={onWidthChange} width={width}>
        <aside css={sidebarCSS}>
          <div css={sidebarContentCSS}>
            {children}
          </div>
          <ResizeControl onWidthChange={onWidthChange} />
        </aside>
      </SidebarContainer>
  );
};
