import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  selectIsWaterTrackerServiceRunning,
  selectWaterTrackerLastStarted
} from '../redux/slices/waterTrackerSlice'
import { selectWaterTrackerWaterInterval } from '../redux/slices/configsSlice'
import { getAlreadyCompletedTime } from '../utils/waterTrackerUtils'

const WaterBottle = () => {
  const [percentage, setPercentage] = useState<number>(100)

  const isServiceRunning = useSelector(selectIsWaterTrackerServiceRunning)
  const lastStarted = useSelector(selectWaterTrackerLastStarted)
  const interval = useSelector(selectWaterTrackerWaterInterval)

  let timer: NodeJS.Timer

  useEffect(() => {
    if (isServiceRunning) {
      timer = setInterval(() => {
        const completed = getAlreadyCompletedTime(lastStarted, interval)
        const remainingPercentage = ((interval - completed) / interval) * 100
        setPercentage(remainingPercentage)
      }, 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [isServiceRunning, interval])

  return (
    <WaterBottleContainer percentage={percentage}>
      <div className='bottle'>
        <div className='wave-container'>
          <svg
            className='waves'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            viewBox='0 24 150 28'
            preserveAspectRatio='none'
            shapeRendering='auto'
          >
            <defs>
              <path
                id='gentle-wave'
                d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
              />
            </defs>
            <g className='parallax'>
              <use xlinkHref='#gentle-wave' x='48' y='0' fill='rgba(41, 128, 185, 0.3)' />
              <use xlinkHref='#gentle-wave' x='48' y='3' fill='rgba(41, 128, 185, 0.5)' />
              <use xlinkHref='#gentle-wave' x='48' y='5' fill='rgba(41, 128, 185, 0.7)' />
              <use xlinkHref='#gentle-wave' x='48' y='7' fill='rgba(41, 128, 185, 1)' />
            </g>
          </svg>
        </div>
        <div className='bubbles-container'>
          <div className='bubble bubble--1' />
          <div className='bubble bubble--2' />
          <div className='bubble bubble--3' />
          <div className='bubble bubble--4' />
          <div className='bubble bubble--5' />
          <div className='bubble bubble--6' />
          <div className='bubble bubble--7' />
          <div className='bubble bubble--8' />
          <div className='bubble bubble--9' />
          <div className='bubble bubble--10' />
          <div className='bubble bubble--11' />
          <div className='bubble bubble--12' />
        </div>
      </div>
    </WaterBottleContainer>
  )
}

const WaterBottleContainer = styled.div<{ percentage: number }>`
  .bottle {
    height: 500px;
    width: 300px;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .bubbles-container {
    display: block;
    position: relative;
    height: ${({ percentage }) => percentage}%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 100%;
    background: linear-gradient(0deg, #182848, #2980b9);
    overflow: hidden;
    transition: height 0.1s linear;
  }

  .bubble {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    position: absolute;
    background-color: white;
    bottom: -100px;
    animation: bubble 15s ease-in-out infinite, sideWays 4s ease-in-out infinite alternate;
  }

  @keyframes bubble {
    0% {
      transform: translateY(0%);
      opacity: 0;
    }
    5% {
      opacity: 0.08;
    }
    95% {
      opacity: 0.01;
    }
    98% {
      opccity: 0;
    }
    100% {
      opacity: 0;
      transform: translateY(-400px);
    }
  }

  @keyframes sideWays {
    0% {
      margin-left: 0px;
    }
    100% {
      margin-left: 30%;
    }
  }

  .bubble--1 {
    left: 10%;
    animation-delay: 0.5s;
    animation-duration: 16s;
    opacity: 0.2;
  }

  .bubble--2 {
    width: 15px;
    height: 15px;
    left: 40%;
    animation-delay: 1s;
    animation-duration: 10s;
    opacity: 0.1;
  }

  .bubble--3 {
    width: 10px;
    height: 10px;
    left: 30%;
    animation-delay: 5s;
    animation-duration: 20s;
    opacity: 0.3;
  }

  .bubble--4 {
    width: 25px;
    height: 25px;
    left: 40%;
    animation-delay: 8s;
    animation-duration: 17s;
    opacity: 0.2;
  }

  .bubble--5 {
    width: 30px;
    height: 30px;
    left: 60%;
    animation-delay: 10s;
    animation-duration: 15s;
    opacity: 0.1;
  }

  .bubble--6 {
    width: 10px;
    height: 10px;
    left: 80%;
    animation-delay: 3s;
    animation-duration: 30s;
    opacity: 0.4;
  }

  .bubble--7 {
    width: 15px;
    height: 15px;
    left: 90%;
    animation-delay: -7s;
    animation-duration: 25s;
    opacity: 0.3;
  }

  .bubble--9 {
    width: 20px;
    height: 20px;
    left: 50%;
    bottom: 30px;
    animation-delay: -5s;
    animation-duration: 19s;
    opacity: 0.2;
  }

  .bubble--10 {
    width: 40px;
    height: 40px;
    left: 30%;
    bottom: 30px;
    animation-delay: -21s;
    animation-duration: 16s;
    opacity: 0.3;
  }

  .bubble--11 {
    width: 30px;
    height: 30px;
    left: 60%;
    bottom: 30px;
    animation-delay: -13.75s;
    animation-duration: 20s;
    opacity: 0.3;
  }

  .bubble--12 {
    width: 25px;
    height: 25px;
    right: 90%;
    bottom: 30px;
    animation-delay: -10.5s;
    animation-duration: 19s;
    opacity: 0.3;
  }

  .wave-container {
    background: transparent;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .waves {
    position: relative;
    width: 100%;
    height: 40%;
    margin-bottom: -7px;
    min-height: 100px;
    max-height: 150px;
  }

  .parallax > use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }
  .parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }
  .parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }
  .parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }
  .parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
    fill: rgba(41, 128, 185, 1);
  }
  @keyframes move-forever {
    0% {
      transform: translate3d(-90px, 0, 0);
    }
    100% {
      transform: translate3d(85px, 0, 0);
    }
  }

  .parallax > use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }
  .parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }
  .parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }
  .parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }
  .parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }
  @keyframes move-forever {
    0% {
      transform: translate3d(-90px, 0, 0);
    }
    100% {
      transform: translate3d(85px, 0, 0);
    }
  }
`

export default WaterBottle
