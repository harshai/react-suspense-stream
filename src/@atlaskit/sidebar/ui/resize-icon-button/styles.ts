import { B100, B200, N0, N200, N30A } from '@atlaskit/theme/colors';

export const toggleButtonCSS = (isHighlighted: boolean) => ({
  backgroundColor: N0,
  border: 0,
  borderRadius: '50%',
  boxShadow: `0 0 0 1px ${N30A}, 0 2px 4px 1px ${N30A}`,
  color: isHighlighted ? B100 : N200,
  cursor: 'pointer',
  height: 24,
  // opacity: isVisible ? 1 : 0,
  outline: 0,
  padding: 0,
  transition: `
    background-color 100ms linear,
    color 100ms linear,
    opacity 300ms cubic-bezier(0.2, 0, 0, 1)
  `,
  width: 24,

  ':hover': {
    backgroundColor: B100,
    color: N0,
  },
  ':active': {
    backgroundColor: B200,
    color: N0,
  },
  ':focus': {
    opacity: 1,
    backgroundColor: B200,
    color: N0,
  },
}) as const;
