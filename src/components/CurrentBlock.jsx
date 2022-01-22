import React from 'react'
import { useSelector } from 'react-redux'

import { selectCurrentBlock } from '../redux/slices/timeBlocksSlice'
import HeaderBubble from './HeaderBubble.jsx'

const CurrentBlock = () => {
    const currentBlock = useSelector(selectCurrentBlock)

    let mainText = ' '
    let secText = ''

    if (currentBlock && currentBlock.id) {
        mainText = currentBlock.title
        if (currentBlock.timeLeft.hours > 0) {
            secText += `${(currentBlock.timeLeft.hours * 60) + currentBlock.timeLeft.minutes} mintues`
        } else if (currentBlock.timeLeft.minutes > 0) {
            secText += `${currentBlock.timeLeft.minutes} minutes`
        }
        secText += ` remaining`
    } else {
        mainText = 'Done for today'
    }

    return (
        <React.Fragment>
            <HeaderBubble mainText={mainText} secText={secText} />
        </React.Fragment>
    )
}

export default React.memo(CurrentBlock)