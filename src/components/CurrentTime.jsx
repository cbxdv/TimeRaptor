import React, { useEffect, useState } from 'react'

import { getCurrentDate, getCurrentDay } from '../utils/timeUtils'
import HeaderBubble from './HeaderBubble'

const getCurrentTime = () => new Date().toLocaleTimeString()

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime())
  const [currentDate, setCurrentDate] = useState(getCurrentDate())
  const [currentDay, setCurrentDay] = useState(getCurrentDay())

  let timer
  useEffect(() => {
    timer = setInterval(() => {
      setCurrentTime(getCurrentTime())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (
      new Date().toLocaleTimeString() === '12:00:00 AM' ||
      new Date().toLocaleTimeString() === '00:00:00 AM'
    ) {
      setCurrentDate(getCurrentDate())
      setCurrentDay(getCurrentDay())
      // eslint-disable-next-line
      location.reload()
    }
  })

  return (
    <HeaderBubble
      mainText={currentTime}
      secText={`${currentDate} - ${currentDay}`}
    />
  )
}

export default CurrentTime
