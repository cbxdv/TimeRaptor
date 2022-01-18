import { css } from 'styled-components';

import { themeColors } from './styleConstants.js';

/**
 * Center a element using flex
 * @param {{alignItems?: String, justifyContent?: String, flexDirection? : String}} options Options for flex
 */
export function flexCenter(options = {}) {
  let { alignItems, justifyContent, flexDirection } = options;
  if (!alignItems) {
    alignItems = 'center';
  }
  if (!justifyContent) {
    justifyContent = 'center';
  }
  if (!flexDirection) {
    flexDirection = 'row';
  }
  return css`
    display: flex;
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    flex-direction: ${flexDirection};
  `;
}

export const buttonStyles = () => css`
  ${flexCenter()};
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: ${themeColors.shade1};
  cursor: pointer;

  & > svg {
    fill: ${themeColors.accent};
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const inputBack = () => css`
  height: 50px;
  width: 300px;
  outline: none;
  border: none;
  background-color: ${themeColors.shade1};
  border-radius: 8px;
  padding: 0 14px;
  font-family: Outfit;
  font-size: 16px;
  font-weight: 600;
`;
