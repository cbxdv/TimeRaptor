import React from 'react'
import styled from 'styled-components'

import DoneIcon from '../assets/icons/Done.svg'
import { buttonStyles, flexCenter } from '../styles/styleUtils'

const CheckBox = ({ checked = true, onClick }) => {
  return (
    <CheckBoxContainer checked={checked} onClick={onClick}>
      {checked && <DoneIcon />}
    </CheckBoxContainer>
  )
}

const CheckBoxContainer = styled.div`
  ${flexCenter()};
  ${buttonStyles()}
  height: 30px;
  width: 30px;
  border: 2px solid ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.accent)};
  border-radius: 8px;
  cursor: pointer;

  & > svg {
    width: 18px;
    height: 18px;
    fill: ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.accent)};
  }
`

export default CheckBox
