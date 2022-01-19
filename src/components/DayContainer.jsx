import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { flexCenter } from '../styles/styleUtils.js'

import DayColumn from './DayColumn.jsx'

const DayContainer = () => {

  const blocksStatus = useSelector((state) => state.blocks.status)
  
  if (blocksStatus === 'loading') {
    return <>Loading...</>
  }

  return (
    <DayContainerContainer>
      <DayColumnContainer>
        <DayColumn dayId='monday' />
      </DayColumnContainer>
      <DayColumnContainer>
        <DayColumn dayId='tuesday' />
      </DayColumnContainer>
      <DayColumnContainer>
        <DayColumn dayId='wednesday' />
      </DayColumnContainer>
      <DayColumnContainer>
        <DayColumn dayId='thursday' />
      </DayColumnContainer>
      <DayColumnContainer>
        <DayColumn dayId='friday' />
      </DayColumnContainer>
      <DayColumnContainer>
        <DayColumn dayId='saturday' />
      </DayColumnContainer>
      <DayColumnContainer rm>
        <DayColumn dayId='sunday' />
      </DayColumnContainer>
    </DayContainerContainer>
  )
}

const DayContainerContainer = styled.div`
  height: 100%;
  width: 100%;
  ${flexCenter()};
  border-radius: 8px;
`

const DayColumnContainer = styled.div`
  margin-right: ${(props) => (props.rm ? 0 : `5px`)};
  width: 100%;
  border-radius: 8px;
`

export default DayContainer
