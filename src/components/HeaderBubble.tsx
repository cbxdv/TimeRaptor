import React from 'react'
import styled from 'styled-components'

import { flexCenter } from '../styles/styleUtils'

const HeaderBubble: React.FC<HeaderBubbleProps> = ({ mainText, secText }) => (
  <HeaderBubbleContainer>
    <MainText>{mainText}</MainText>
    {secText.length !== 0 && <SecText>{secText}</SecText>}
  </HeaderBubbleContainer>
)

type HeaderBubbleProps = {
  mainText?: string
  secText?: string
}

HeaderBubble.defaultProps = {
  mainText: '',
  secText: ''
}

const HeaderBubbleContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })}
  background: ${({ theme }) => theme.shade1};
  min-width: 150px;
  padding: 10px;
  border-radius: 8px;
  min-height: 60px;
  overflow: hidden;
`

const MainText = styled.div`
  font-family: Outfit;
  font-size: larger;
  font-weight: bold;
  font-size: 16px;
  text-align: center;

  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const SecText = styled.p`
  font-family: Dongle;
  font-size: larger;
  font-weight: normal;
  font-size: 19px;
  height: 20px;
`

export default HeaderBubble
