import { Dispatch } from 'react'
import { PayloadAction } from '@reduxjs/toolkit'
import { checkCurrent } from './timeUtils'
import {
  CurrentTimeBlockUpdatePayloadAction,
  ITimeBlock
} from '../@types/TimeBlockInterfaces'
import { currentBlockUpdated } from '../redux/slices/timetableSlice'

export const currentBlockUpdater = (
  dayData: ITimeBlock[],
  dispatch: Dispatch<PayloadAction<CurrentTimeBlockUpdatePayloadAction>>
) => {
  if (dayData.length === 0) {
    dispatch(currentBlockUpdated(null))
  }
  let newCurrentBlock = null
  dayData.forEach((timeblock: ITimeBlock) => {
    if (checkCurrent(timeblock)) {
      newCurrentBlock = timeblock
    }
  })
  dispatch(currentBlockUpdated(newCurrentBlock))
}

export const getCurrentBlockTimeLeftString = (currentBlock: ITimeBlock) => {
  const endTime = new Date()
  endTime.setHours(
    currentBlock.endTime.hours,
    currentBlock.endTime.minutes,
    0,
    0
  )
  const ms = endTime.valueOf() - new Date().valueOf()
  let minutes = Math.round(ms / 1000 / 60)
  if (minutes === 0) minutes = 1
  return `${minutes} minutes remaining`
}
