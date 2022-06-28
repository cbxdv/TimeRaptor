import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBlocksByCurrentDay, selectCurrentBlock } from '../redux/slices/timetableSlice'
import { currentBlockUpdater, getCurrentBlockTimeLeftString } from '../utils/currentBlockUtils'

import HeaderBubble from './HeaderBubble'

const CurrentBlock = () => {
  const dispatch = useDispatch()

  const dayData = useSelector(selectBlocksByCurrentDay)
  const currentBlock = useSelector(selectCurrentBlock)

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
