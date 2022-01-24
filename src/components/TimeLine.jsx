import React from 'react'
import styled from 'styled-components'

import { convertIndexToStringHours } from '../utils/timeUtils'
import { flexCenter } from '../styles/styleUtils'

const TimeLine = () => {
  const generateTimeLine = () => {
    const line = []
    for (let i = 0; i < 24; i += 1) {
      line.push(
        <OneHourComponent key={`${i}tlb`}>
          <span>{convertIndexToStringHours(i, true)}</span>
        </OneHourComponent>
      )
    }
    return line
  }

  const generateTimeLineSecs = () => {
    const secs = []
    for (let i = 0; i <= 24 * 4; i += 1) {
      secs.push(
        <OneBlockSecs key={`tls${i}`}>{i % 4 !== 0 && <TLine />}</OneBlockSecs>
      )
    }
    return secs
  }

  return (
    <TimeLineContainer>
      {generateTimeLineSecs()}
      <TimeLineTickerContainer>
        {generateTimeLine()}
        <span style={{ fontFamily: 'Dongle', fontSize: '18px' }}>12 p.m.</span>
      </TimeLineTickerContainer>
    </TimeLineContainer>
  )
}

const TimeLineContainer = styled.div`
  width: max-content;
  min-width: 40px;
  position: relative;
  margin-top: 50px;
  margin-right: 10px;
`

const OneHourComponent = styled.div`
  height: 80px;
  font-family: Dongle;
  font-size: 18px;
`

const OneBlockSecs = styled.div`
  height: 20px;
  width: 100%;
  ${flexCenter({ alignItems: 'baseline' })}
`

const TimeLineTickerContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })}
  position: absolute;
  top: -10px;
  left: 0;
  height: 100%;
  width: 100%;
`

const TLine = styled.hr`
  width: 15px;
  border-color: ${({ theme }) =>
    theme.name === 'dark' ? `rgba(255, 255, 255, 0.2)` : `rgba(0, 0, 0, 0.1)`};
  transform: translateY(-1px);
`

export default TimeLine
