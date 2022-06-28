import { css } from 'styled-components'

interface FlexCenterInterface {
  alignItems?: string
  justifyContent?: string
  flexDirection?: string
}

/**
 * Center a element using flex
 * @param {{alignItems?: String, justifyContent?: String, flexDirection? : String}} options
 * Options for flex
 */
export function flexCenter(options: FlexCenterInterface = {}) {
  let { alignItems, justifyContent, flexDirection } = options
  if (!alignItems) {
    alignItems = 'center'
  }
  if (!justifyContent) {
    justifyContent = 'center'
  }
  if (!flexDirection) {
    flexDirection = 'row'
  }
  return css`
    display: flex;
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    flex-direction: ${flexDirection};
  `
}

export const buttonStyles = () => css`
  ${flexCenter()};
  outline: none;
  border: 1px solid ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.accent)};
  border-radius: 8px;
  background: none;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform linear 0.15s;

  & > svg {
    fill: ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.accent)};
  }

  &:active {
    transform: scale(0.95);
  }
`

export const inputBack = () => css`
  height: 50px;
  width: 300px;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.shade1};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  padding: 0 14px;
  font-family: Outfit;
  font-size: 16px;
  font-weight: 500;

  & > svg {
    fill: ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.accent)};
    cursor: pointer;
  }

  &::selection {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.shade1};
  }
`

export const emojiTextStyles = () => css`
  ${flexCenter()};
  line-height: 2;

  .text-link {
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 4px;
      left: 0;
      border: 1px solid ${({ theme }) => theme.text};
    }
  }

  .text-image {
    height: 20px;
    margin: 0 10px;
  }
`
