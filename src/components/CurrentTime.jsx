import React, { useEffect, useState } from 'react'

import { getCurrentDate, getCurrentDay } from '../utils/timeUtils.js'
import HeaderBubble from './HeaderBubble.jsx'

const getCurrentTime = () => {
  return new Date().toLocaleTimeString()
}

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime())
  const [currentDate, setCurrentDate] = useState(getCurrentDate())
  const [currentDay, setCurrentDay] = useState(getCurrentDay())

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(getCurrentTime())
    }, 1000)
  }, [])

  useEffect(() => {
    if (
      (new Date().toLocaleTimeString() === '12:00:00 AM') |
      (new Date().toLocaleTimeString() === '00:00:00 AM')
    ) {
      setCurrentDate(getCurrentDate())
      setCurrentDay(getCurrentDay())
    }
  })

  return (
    <HeaderBubble mainText={currentTime} secText={`${currentDate} - ${currentDay}`} />
  )
}

export default CurrentTime
