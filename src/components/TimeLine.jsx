import React from 'react'
import styled from 'styled-components'

import { convertIndexToStringHours } from '../utils/timeUtils.js'

import { flexCenter } from '../styles/styleUtils.js'

const TimeLine = () => {
  const generateTimeLine = () => {
    let line = []
    for (let i = 0; i < 24; i++) {
      line.push(
        <OneHourComponent key={`${i}tlb`}>
          <span>{convertIndexToStringHours(i, true)}</span>
        </OneHourComponent>
      )
    }
    return line
  }

  const generateTimeLineSecs = () => {
    let secs = []
    for (let i = 0; i <= 24 * 4; i++) {
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
  top: -12px;
  left: 0;
  height: 100%;
  width: 100%;
`

const TLine = styled.hr`
  width: 15px;
  background-color: #d4d4d4;
  transform: translateY(-1px);
`

export default TimeLine
