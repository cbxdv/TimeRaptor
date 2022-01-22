import React from 'react'
import { useSelector } from 'react-redux'

import { selectCurrentBlock } from '../redux/slices/timeBlocksSlice'
import HeaderBubble from './HeaderBubble.jsx'

const CurrentBlock = () => {
    const currentBlock = useSelector(selectCurrentBlock)

    let mainText = ''
    let secText = ''


    if (currentBlock && currentBlock.id) {
        mainText = currentBlock.title
        let hours = currentBlock.timeLeft.hours
        let minutes = currentBlock.timeLeft.minutes
        if (minutes === 0) {
            minutes = 1
        }
        if (hours > 0) {
            secText += `${(hours * 60) + minutes} mintues`
        } else if (minutes > 0) {
            secText += `${minutes} minutes`
        }
        secText += ` remaining`
    }

    if (mainText.length !== 0) {
        return (
            <React.Fragment>
                <HeaderBubble mainText={mainText} secText={secText} />
            </React.Fragment>
        )
    }
    return <></>

}

export default React.memo(CurrentBlock)