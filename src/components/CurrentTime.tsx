import React, { useState, useEffect } from 'react'

import {
  getCurrentLocaleDateString,
  getCurrentDayString
} from '../utils/timeUtils'
import HeaderBubble from './HeaderBubble'

const getCurrentTime = () => new Date().toLocaleTimeString()

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime())
  const [currentDate, setCurrentDate] = useState<string>(
    getCurrentLocaleDateString()
  )
  const [currentDay, setCurrentDay] = useState<string>(getCurrentDayString())

  let timer: NodeJS.Timer
  useEffect(() => {
    timer = setInterval(() => {
      setCurrentTime(getCurrentTime())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (currentTime === '12:00:00 AM' || currentTime === '00:00:00 AM') {
      setCurrentDate(getCurrentLocaleDateString())
      setCurrentDay(getCurrentDayString())

      // eslint-disable-next-line
      location.reload()
    }
  })

  return (
    <HeaderBubble
      mainText={currentTime}
      secText={`${currentDate} - ${
        currentDay[0].toUpperCase() + currentDay.substring(1)
      }`}
    />
  )
}

export default CurrentTime
