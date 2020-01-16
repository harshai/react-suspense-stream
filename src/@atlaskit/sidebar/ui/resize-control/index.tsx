/** @jsx jsx */
import { useRef, MouseEvent as ReactMouseEvent } from 'react';
import { jsx } from '@emotion/core';

import { useSidebar } from '../..';
import { GrabArea } from '../grab-area';
import { ResizeIconButton } from '../resize-icon-button';
import { resizeControlCSS, resizeIconButtonCSS } from './styles';
import { animate } from './utils';

export type ResizeControlProps = {
  onWidthChange: (width: number) => void;
};

// TODO shadow
// TODO cleanup event listeners properly
export const ResizeControl = ({ onWidthChange }: ResizeControlProps) => {
  const x = useRef(0);
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

    onWidthChange(x.current);
  };

  const onMouseUp = () => {
    onResize(x.current);
    onWidthChange(x.current);

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
      setWidth: onWidthChange,
      onComplete: isCollapsed ? expand : collapse,
    });
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
};
