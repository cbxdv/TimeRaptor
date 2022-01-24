import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { getCurrentTimeAndDay } from '../utils/timeUtils'

const CurrentTimeLine = () => {
  // Creating a scroll state variable to check whether the componenet is moving
  // This prevents multiple scroll inputs especially when using key binds
  const [isScrolling, setScrolling] = useState(false)
  const [startPosition, setStartPosition] = useState(20)

  const currentTimeLineRef = useRef(null)
  const scrollToTime = () => {
    if (isScrolling) {
      return
    }
    setScrolling(true)
    currentTimeLineRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
    setTimeout(() => {
      setScrolling(false)
    }, 2000)
  }

  const keyBindHandler = event => {
    if ((event.key === 'f' || event.key === 'F') && event.ctrlKey) {
      scrollToTime()
    }
  }

  let timer
  let currentTime
  const moveLinePosition = () => {
    let tempStart = 0

    const checkStartPosition = () => {
      currentTime = getCurrentTimeAndDay()
      tempStart = currentTime.hours * 80 + (currentTime.minutes / 15) * 20 + 19
      if (currentTime.pm === true) {
        if (currentTime.hours !== 12) {
          tempStart += 12 * 80
        }
      }
      if (currentTime.pm === false && currentTime.hours === 12) {
        tempStart -= 12 * 80
      }
      setStartPosition(tempStart)
    }

    checkStartPosition()
    timer = setInterval(checkStartPosition, 60000)
  }

  useEffect(() => {
    setScrolling(true)
    setTimeout(() => scrollToTime(), 500)
    moveLinePosition()
    document.addEventListener('keydown', keyBindHandler)
    return () => {
      document.removeEventListener('keydown', keyBindHandler)
      clearInterval(timer)
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <Indicator startPosition={startPosition} />
      <CurrentTimeLineContainer
        startPosition={startPosition}
        ref={currentTimeLineRef}
      />
    </div>
  )
}

const CurrentTimeLineContainer = styled.hr`
  position: absolute;
  top: ${({ startPosition }) => startPosition}px;
  width: 100%;
  left: 0;
  border: 1px dashed #fd2513;
  box-shadow: 0 0 10px 0 #fd2513;
  scroll-behavior: smooth;
`

const Indicator = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  top: ${({ startPosition }) => startPosition - 3}px;
  left: 0;
  border-radius: 100%;
  border: 4px solid #fd2513;
`

export default CurrentTimeLine
