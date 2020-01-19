/** @jsx jsx */
import { useRef, MouseEvent as ReactMouseEvent, memo } from 'react';
import { jsx } from '@emotion/core';

import { useSidebar } from '../..';
import { GrabArea } from '../grab-area';
import { ResizeIconButton } from '../resize-icon-button';
import { resizeControlCSS, resizeIconButtonCSS } from './styles';

// TODO cleanup event listeners properly
export const ResizeControl = memo(() => {
  const x = useRef(0);
  const [{ collapsedWidth, isCollapsed, width }, { collapse, expand, resize, setWidth }] = useSidebar();
  console.log('rendering resize control...');

  const onMouseMove = (event: MouseEvent) => {
    // Allow the sidebar to be 75% of the available page width
    const maxWidth = Math.round((window.innerWidth / 4) * 3);
    const delta = Math.max(
        Math.min(event.pageX - width, maxWidth - width),
        collapsedWidth - width,
    );

    x.current = width + delta;

    resize(x.current);
  };

  const onMouseUp = () => {
    setWidth(x.current);
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
    if (isCollapsed) {
      expand();
    } else {
      collapse();
    }
  };

  return (
      <div css={resizeControlCSS}>
        {!isCollapsed && <GrabArea onMouseDown={onMouseDown} />}
        <ResizeIconButton
            css={resizeIconButtonCSS}
            className="resize-icon-button"
            isCollapsed={isCollapsed}
            label="Toggle navigation"
            onClick={onResizeIconButtonClick}
        />
      </div>
  );
});
