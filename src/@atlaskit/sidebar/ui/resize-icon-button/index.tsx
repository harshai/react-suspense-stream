/** @jsx jsx */
import React, { ButtonHTMLAttributes } from 'react';
import ChevronLeft from '@atlaskit/icon/glyph/chevron-left';
import ChevronRight from '@atlaskit/icon/glyph/chevron-right';
import Tooltip, { TooltipProps } from '@atlaskit/tooltip';
import { jsx } from '@emotion/core';
import { toggleButtonCSS } from './styles';

export type ResizeIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isCollapsed: boolean;
  isHighlighted: boolean;
  label: string;
  tooltip?: TooltipProps['content'];
};

export const ResizeIconButton = ({ isCollapsed, isHighlighted, label, tooltip, ...props }: ResizeIconButtonProps) => {
  const ButtonIcon = isCollapsed ? ChevronRight : ChevronLeft;

  const button = (
      <button aria-expanded={!isCollapsed} aria-label={label} type="button" css={toggleButtonCSS(isHighlighted)} {...props}>
        <ButtonIcon label="" />
      </button>
  );

  return tooltip
      ? <Tooltip
          content={tooltip}
          delay={600}
          hideTooltipOnClick
          position="right"
      >
        {button}
      </Tooltip>
      : button;
};
