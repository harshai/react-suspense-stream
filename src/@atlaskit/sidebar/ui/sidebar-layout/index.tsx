/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/core';
import { ResizeControl } from '../resize-control';
import { sidebarCSS, sidebarContentCSS } from './styles';

export type SidebarLayoutProps = {
  children: ReactNode;
};

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
      <aside css={sidebarCSS}>
        <div css={sidebarContentCSS}>
          {children}
        </div>
        <ResizeControl />
      </aside>
  );
};
