import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { getCurrentTimeAndDay } from '../utils/timeUtils'

const CurrentTimeLine = () => {
  // Creating a scroll state variable to check whether the componenet is moving
  // This prevents multiple scroll inputs especially when using key binds
  const [isScrolling, setScrolling] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState<number>(20)

  const currentTimeLineRef = useRef<HTMLHRElement | null>(null)

  let timer: NodeJS.Timer
  let scrollTimer: NodeJS.Timer

  const scrollToTime = () => {
    if (isScrolling) {
      return
    }
    setScrolling(true)
    currentTimeLineRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
    scrollTimer = setTimeout(() => {
      setScrolling(false)
    }, 2000)
  }

  const keyBindHandler = (event: KeyboardEvent) => {
    if ((event.key === 'f' || event.key === 'F') && event.ctrlKey) {
      scrollToTime()
    }
  }

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
      clearTimeout(timer)
      clearTimeout(scrollTimer)
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <Indicator startPosition={startPosition} />
      <CurrentTimeLineContainer startPosition={startPosition} ref={currentTimeLineRef} />
    </div>
  )
}

type StylePropTypes = { startPosition: number }

const CurrentTimeLineContainer = styled.hr<StylePropTypes>`
  position: absolute;
  top: ${({ startPosition }) => startPosition}px;
  width: 100%;
  left: 0;
  border: 1px dashed #fd2513;
  box-shadow: 0 0 10px 0 #fd2513;
  scroll-behavior: smooth;
`

const Indicator = styled.div<StylePropTypes>`
  width: 0;
  height: 0;
  position: absolute;
  top: ${({ startPosition }) => startPosition - 3}px;
  left: 0;
  border-radius: 100%;
  border: 4px solid #fd2513;
`

export default CurrentTimeLine
