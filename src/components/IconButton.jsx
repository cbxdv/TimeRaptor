import React from 'react'
import styled from 'styled-components'

import { buttonStyles } from '../styles/styleUtils'

const IconButton = ({ Icon, label = '', onClick = () => {} }) => (
  <IconButtonContainer labelLength={label.length} onClick={onClick}>
    {Icon !== undefined && <Icon />}
    {label.length !== 0 && label}
  </IconButtonContainer>
)

const IconButtonContainer = styled.div`
  ${buttonStyles()};
  height: 40px;
  width: ${({ labelLength }) => (labelLength === 0 ? `40px` : `120px`)};
  font-family: Outfit;
  font-size: 18px;
  font-weight: 700;

  & > svg {
    margin-right: ${({ labelLength }) => (labelLength === 0 ? `0` : `10px`)};
  }
`

export default IconButton
