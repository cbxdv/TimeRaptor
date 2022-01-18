import React from 'react'
import styled from 'styled-components'

import { themeColors } from '../styles/styleConstants.js'
import { buttonStyles } from '../styles/styleUtils.js'

const TextButton = ({ label = '', variant = '', onClick = () => {} }) => {
  const backgroundColor = getBackground(variant)
  const textColor = getTextColor(variant)

  return (
    <TextButtonContainer
      textColor={textColor}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {label}
    </TextButtonContainer>
  )
}

const getBackground = (variant) => {
  switch (variant) {
    case 'danger':
      return `#FFE5E5`
    case 'success':
      return `#F3F8F4`
    default:
      return themeColors.shade1
  }
}

const getTextColor = (variant) => {
  switch (variant) {
    case 'danger':
      return `#e24446`
    case 'success':
      return `#36a568`
    default:
      return themeColors.accent
  }
}

const TextButtonContainer = styled.button`
  ${buttonStyles()};
  outline: none;
  border: none;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  border: 2px solid ${(props) => props.textColor};
  min-width: 120px;
  height: 40px;
  border-radius: 8px;
  font-family: Outfit;
  font-weight: 800;
  font-size: 16px;
`

export default TextButton
