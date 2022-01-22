import React from 'react'
import styled from 'styled-components'

import { buttonStyles } from '../styles/styleUtils.js'

const TextButton = ({ label = '', variant = '', onClick = () => {} }) => {
  const textColor = getTextColor(variant)

  return (
    <TextButtonContainer textColor={textColor} onClick={onClick}>
      {label}
    </TextButtonContainer>
  )
}

const getTextColor = (variant) => {
  switch (variant) {
    case 'danger':
      return `#E24446`
    case 'success':
      return `#36A568`
    default:
      return `#000000`
  }
}

const TextButtonContainer = styled.button`
  ${buttonStyles()};
  outline: none;
  border: none;
  color: ${({ textColor }) => textColor};
  border: 2px solid ${({ textColor }) => textColor};
  min-width: 120px;
  height: 40px;
  border-radius: 8px;
  font-family: Outfit;
  font-weight: 800;
  font-size: 16px;
`

export default TextButton
