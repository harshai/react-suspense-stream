/** @jsx jsx */
import { HTMLAttributes } from 'react';
import { jsx } from '@emotion/core';
import { grabAreaCSS, lineCSS } from './styles';

export type GrabAreaProps = HTMLAttributes<HTMLDivElement>;

export const GrabArea = (props: GrabAreaProps) => (
    <div css={grabAreaCSS} {...props}>
      <div css={lineCSS} className="grab-area-line" />
    </div>
);
