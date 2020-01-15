/** @jsx jsx */
import { useRef } from 'react';
import { jsx } from '@emotion/core';

import { useSidebar } from '../..';
import { GrabArea } from '../grab-area';
import { ResizeIconButton } from '../resize-icon-button';
import { resizeControlCSS, resizeIconButtonCSS } from './styles';

// TODO shadow
export const ResizeControl = () => {
  const initialX = useRef(0);
  const [{ isCollapsed, width: initialWidth }, { onResize, toggle }] = useSidebar();

  const onMouseMove = (event: any) => {
    // Allow the sidebar to be 75% of the available page width
    const maxWidth = Math.round((window.innerWidth / 4) * 3);
    const minWidth = 20;

    const adjustedMax = maxWidth - initialWidth;
    const adjustedMin = minWidth - initialWidth;

    const delta = Math.max(
        Math.min(event.pageX - initialX.current, adjustedMax),
        adjustedMin,
    );
    const width = initialWidth + delta;

    onResize(width);
  };

  const onMouseUp = () => {
    initialX.current = 0;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onMouseDown = (event: MouseEvent) => {
    initialX.current = event.pageX;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onResizeIconButtonClick = () => {
    toggle();
  };

  return (
      <div css={resizeControlCSS}>
        <GrabArea onMouseDown={onMouseDown} />
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
