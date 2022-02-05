import React from 'react'
import styled from 'styled-components'

import { buttonStyles } from '../styles/styleUtils'

const TextButton: React.FC<TextButtonProps> = ({ label, variant, onClick }) => {
  const getTextColor = () => {
    switch (variant) {
      case 'danger':
        return `#E24446`
      case 'success':
        return `#36A568`
      default:
        return `#000000`
    }
  }

  const textColor = getTextColor()

  return (
    <TextButtonContainer textColor={textColor} onClick={onClick}>
      {label}
    </TextButtonContainer>
  )
}

type TextButtonProps = {
  label: string
  variant: 'danger' | 'success' | ''
  onClick: () => void
}

const TextButtonContainer = styled.button<{ textColor: string }>`
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
  margin: 10px 0;
  padding: 0 20px;
`

export default TextButton
