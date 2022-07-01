import React, { useEffect } from 'react'

import { selectBlocksByCurrentDay, selectCurrentBlock } from '../redux/slices/timetableSlice'
import { currentBlockUpdater, getCurrentBlockTimeLeftString } from '../utils/currentBlockUtils'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import HeaderBubble from './HeaderBubble'

const CurrentBlock = () => {
  const dispatch = useAppDispatch()

  const dayData = useAppSelector(selectBlocksByCurrentDay)
  const currentBlock = useAppSelector(selectCurrentBlock)

  let timer: NodeJS.Timer

  useEffect(() => {
    clearInterval(timer)
    currentBlockUpdater(dayData, dispatch)
    setInterval(() => {
      currentBlockUpdater(dayData, dispatch)
    }, 60000)
    return () => {
      clearInterval(timer)
    }
  }, [dayData])

  if (currentBlock) {
    const mainText = currentBlock.title
    const secText = getCurrentBlockTimeLeftString(currentBlock)

    if (mainText.length !== 0) {
      return <HeaderBubble mainText={mainText} secText={secText} />
    }
  }
  return <div />
}

export default React.memo(CurrentBlock)
