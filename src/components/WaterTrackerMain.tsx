import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getAlreadyCompletedTime } from '../utils/waterTrackerUtils'
import { selectWaterTrackerWaterInterval } from '../redux/slices/configsSlice'
import {
  selectIsWaterTrackerServiceRunning,
  selectWaterTrackerLastStarted,
  waterTrackerStarted,
  waterTrackerStopped
} from '../redux/slices/waterTrackerSlice'
import { flexCenter } from '../styles/styleUtils'
import TextButton from './TextButton'
import WaterBottle from './WaterBottle'
import { useAppDispatch, useAppSelector } from '../redux/hook'

const WaterTrackerMain = () => (
  <MainContainer>
    <Container>
      <WaterBottle />
    </Container>
    <Container>
      <ContainerSec>
        <WaterTrackerContols />
      </ContainerSec>
    </Container>
  </MainContainer>
)

const WaterTrackerContols = () => {
  const dispatch = useAppDispatch()

  const [rem, setRem] = useState<number>(0)

  const isServiceRunning = useAppSelector(selectIsWaterTrackerServiceRunning)
  const lastStarted = useAppSelector(selectWaterTrackerLastStarted)
  const interval = useAppSelector(selectWaterTrackerWaterInterval)

  const toggleService = () => {
    if (isServiceRunning) {
      dispatch(waterTrackerStopped())
    } else {
      dispatch(waterTrackerStarted())
    }
  }

  let timer: NodeJS.Timer

  useEffect(() => {
    setRem(interval)
    if (isServiceRunning) {
      timer = setInterval(() => {
        const completed = getAlreadyCompletedTime(lastStarted, interval)
        setRem(interval - completed)
      }, 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [isServiceRunning, interval])

  return (
    <Container>
      <h1 style={{ marginBottom: '30px' }}>
        {isServiceRunning ? 'Water Tracking ⏳' : 'Water Not Tracking ⌛'}
      </h1>
      {isServiceRunning && (
        <h3 style={{ marginBottom: '30px' }}>Remaining {rem !== 0 ? rem : 1} minutes</h3>
      )}
      <div>
        <TextButton
          label={isServiceRunning ? 'Stop' : 'Start'}
          variant={isServiceRunning ? 'danger' : 'success'}
          onClick={toggleService}
        />
      </div>
    </Container>
  )
}

const MainContainer = styled.div`
  ${flexCenter()};
  height: 100%;
  width: 100%;
`

const Container = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  width: 100%;
  height: 100%;
`

const ContainerSec = styled.div`
  ${flexCenter()};
`

export default WaterTrackerMain
