import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { getCurrentTimeAndDay } from '../utils/timeUtils.js'

const CurrentTimeLine = () => {

    // Creating a scroll state variable to check whether the componenet is moving
    // This prevents multiple scroll inputs especially when using key binds
    const [isScrolling, setScrolling] = useState(false)
    const [startPosition, setStartPosition] = useState(78)

    const currentTimeLineRef = useRef(null)
    const scrollToTime = () =>  {
        if (isScrolling) {
            return
        }
        setScrolling(true)
        currentTimeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => {
            setScrolling(false)
        }, 2000)
    }

    const keyBindHandler = event => {
        if (event.key === 'f' || event.key === 'F') {
            scrollToTime()
        }
    }

    let timer
    let currentTime
    const moveLinePosition = () => {
        let tempStart = 0

        const checkStartPosition = () => {
            currentTime = getCurrentTimeAndDay()
            tempStart = currentTime.hours * 80 + (currentTime.minutes / 15) * 20 + 20
            if (currentTime.pm === true) {
                tempStart += 12 * 80
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
        <div>
            <CurrentTimeLineContainer startPosition={startPosition} ref={currentTimeLineRef} />
        </div>
    )
}

const CurrentTimeLineContainer = styled.div`
    position: absolute;
    top: ${({ startPosition }) => startPosition}px;
    width: 60%;
    left: 0;
    border: 2px solid #FC6C5E;
    box-shadow: 0 0 10px 0 #FC6C5E;
    scroll-behavior: smooth;
`

// const Indicator = styled.div

export default CurrentTimeLine