import { Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { currentTimetableBlockChanged } from '../redux/slices/appSlice'
import { ITimeStamp } from '../@types/AppInterfaces'
import { checkCurrent } from './timeUtils'
import { generateTimeStamps } from './notificationUtils'
import { ITimeBlock } from '../@types/TimeBlockInterfaces'

export const getCurrentBlock = (timeStamps: ITimeStamp[]): ITimeStamp => {
  let newCurrentBlock = null

  timeStamps.forEach(ts => {
    if (checkCurrent(ts.startTime, ts.endTime)) {
      newCurrentBlock = ts
    }
  })
  return newCurrentBlock
}

export const currentBlockUpdater = (
  dayData: ITimeBlock[],
  dispatch: Dispatch<PayloadAction<ITimeStamp>>
) => {
  const timeStamps = generateTimeStamps(dayData)
  const newCurrent = getCurrentBlock(timeStamps)
  dispatch(currentTimetableBlockChanged(newCurrent))
}

export const getCurrentBlockTimeLeft = (currentBlock: ITimeStamp) => {
  const ms = currentBlock.endTime - new Date().valueOf()
  let minutes = Math.round(ms / 1000 / 60)
  if (minutes === 0) minutes = 1
  return `${minutes} minutes remaining`
}
