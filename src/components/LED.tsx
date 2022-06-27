import React from 'react'
import styled from 'styled-components'

import { flexCenter } from '../styles/styleUtils'

const LED: React.FC<LEDProps> = ({ green, red }) => (
  <LEDContainer>
    {green && <GreenLight />}
    {red && <RedLight />}
  </LEDContainer>
)

interface LEDProps {
  green?: boolean
  red?: boolean
}

LED.defaultProps = {
  green: false,
  red: false
}

const LEDContainer = styled.div`
  ${flexCenter()};
  height: 20px;
  margin: 5px;
`

const Light = styled.div`
  margin: 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
`

const GreenLight = styled(Light)`
  background-color: #abff00;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 5px,
    #89ff00 0 2px 12px;
`

const RedLight = styled(Light)`
  background-color: #f00;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
    rgba(255, 0, 0, 0.5) 0 2px 12px;
`

export default LED
