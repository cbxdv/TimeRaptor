import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentBlockTimeLeft } from '../utils/currentBlockUtils'

import { selectTTCurrentBlock } from '../redux/slices/appSlice'
import HeaderBubble from './HeaderBubble'

const CurrentBlock = () => {
  const currentBlock = useSelector(selectTTCurrentBlock)

  if (currentBlock) {
    const mainText = currentBlock.title
    const secText = getCurrentBlockTimeLeft(currentBlock)

    if (mainText.length !== 0) {
      return <HeaderBubble mainText={mainText} secText={secText} />
    }
  }
  return <div />
}

export default React.memo(CurrentBlock)
