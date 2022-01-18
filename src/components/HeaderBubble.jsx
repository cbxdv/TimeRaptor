import React from 'react'
import styled from 'styled-components'

import { flexCenter } from '../styles/styleUtils.js'
import { themeColors } from '../styles/styleConstants.js'

const HeaderBubble = ({ mainText = '', secText = '' }) => {
  return (
    <HeaderBubbleContainer>
      <MainText>{mainText}</MainText>
      <SecText>{secText}</SecText>
    </HeaderBubbleContainer>
  )
}

const HeaderBubbleContainer = styled.div`
  background: ${themeColors.shade1};
  width: 150px;
  ${flexCenter({ flexDirection: 'column', alignItems: 'baseline' })}
  padding: 10px;
  border-radius: 8px;
`

const MainText = styled.p`
  font-family: Outfit;
  font-size: larger;
  font-weight: bold;
  font-size: 16px;
`

const SecText = styled.p`
  font-family: Dongle;
  font-size: larger;
  font-weight: normal;
  font-size: 19px;
`

export default HeaderBubble
