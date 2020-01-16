/** @jsx jsx */
import { useRef, MouseEvent as ReactMouseEvent } from 'react';
import { jsx } from '@emotion/core';

import { usePageLayoutApi } from '../../../page-layout';
import { useSidebar } from '../..';
import { GrabArea } from '../grab-area';
import { ResizeIconButton } from '../resize-icon-button';
import { resizeControlCSS, resizeIconButtonCSS } from './styles';
import { animate } from './utils';

// TODO shadow
// TODO cleanup event listeners properly
export const ResizeControl = () => {
  const x = useRef(0);
  const [, { setSidebarWidth }] = usePageLayoutApi();
  const [{ collapsedWidth, expandedWidth, isCollapsed, width }, { collapse, expand, onResize }] = useSidebar();
  console.log('rendering resize control...');

  const onMouseMove = (event: MouseEvent) => {
    // Allow the sidebar to be 75% of the available page width
    const maxWidth = Math.round((window.innerWidth / 4) * 3);
    const delta = Math.max(
        Math.min(event.pageX - width, maxWidth - width),
        collapsedWidth - width,
    );

    x.current = width + delta;

    setSidebarWidth(x.current);
  };

  const onMouseUp = () => {
    onResize(x.current);

    x.current = 0;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    x.current = event.pageX;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onResizeIconButtonClick = () => {
    animate({
      from: width,
      to: isCollapsed ? expandedWidth : collapsedWidth,
      setWidth: setSidebarWidth,
      onComplete: isCollapsed ? expand : collapse,
    });
  };

  return (
      <div css={resizeControlCSS}>
        {!isCollapsed && <GrabArea onMouseDown={onMouseDown} />}
        <ResizeIconButton
            css={resizeIconButtonCSS}
            isCollapsed={isCollapsed}
            isHighlighted={false}
            label="Toggle navigation"
            onClick={onResizeIconButtonClick}
        />
      </div>
  );
};
