import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useTimeBlocks } from '../data/contexts/timeBlocksContext.js'

import WithModal from '../hooks/WithModal.jsx'
import TextButton from './TextButton.jsx'
import TextInput from './TextInput.jsx'
import TimeInput from './TimeInput.jsx'

import { flexCenter } from '../styles/styleUtils.js'
import ColorPicker from './ColorPicker.jsx'
import TextArea from './TextArea.jsx'
import DayInput from './DayInput.jsx'
import {
  insertNewTimeBlock,
  editTimeBlock,
} from '../data/actions/timeBlocksActions.js'

const TimeBlockEditor = ({
  closeHandler,
  edit = false,
  currentBlock = null,
}) => {
  const { state, dispatch } = useTimeBlocks()

  const [title, setTitle] = useState('')
  const [day, setDay] = useState('monday')
  const [startTime, setStartTime] = useState({
    hours: 1,
    minutes: 0,
    pm: false,
  })
  const [endTime, setEndTime] = useState({ hours: 1, minutes: 0, pm: false })
  const [blockColor, setBlockColor] = useState('decoPeach')
  const [description, setDescription] = useState('')

  const submitHandler = () => {
    let res
    if (edit) {
      res = editTimeBlock({
        currentBlock,
        newTimeBlock: {
          title,
          day,
          startTime,
          endTime,
          blockColor,
          description,
        },
        state,
        dispatch,
      })
    } else {
      res = insertNewTimeBlock({
        timeBlock: { title, startTime, endTime, day, blockColor, description },
        state,
        dispatch,
      })
    }
    if (res) {
      closeHandler()
    }
  }

  useEffect(() => {
    if (!currentBlock || Object.keys(currentBlock).length === 0) {
      return
    }
    setTitle(currentBlock.title)
    setDay(currentBlock.day)
    setStartTime(currentBlock.startTime)
    setEndTime(currentBlock.endTime)
    setBlockColor(currentBlock.blockColor)
    setDescription(currentBlock.description)
  }, [])

  return (
    <WithModal modalTitle='Add New Block' closeHandler={closeHandler}>
      <AddForm>
        <InputContainer>
          <TextInput
            title='Subject Name'
            name='subject'
            inputValue={title}
            onChangeHandler={(event) => setTitle(event.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <DayInput
            title='Day'
            value={day}
            valueSetHandler={(day) => setDay(day)}
          />
        </InputContainer>

        <InputContainer>
          <TimeInput
            title='Start Time'
            value={startTime}
            valueSetHandler={(time) => setStartTime(time)}
          />
        </InputContainer>

        <InputContainer>
          <TimeInput
            title='End Time'
            value={endTime}
            valueSetHandler={(time) => setEndTime(time)}
          />
        </InputContainer>

        <InputContainer>
          <ColorPicker
            title='Block Color'
            color={blockColor}
            valueSetHandler={(color) => setBlockColor(color)}
          />
        </InputContainer>

        <InputContainer>
          <TextArea
            title='Description'
            name='description'
            inputValue={description}
            onChangeHandler={(event) => setDescription(event.target.value)}
          />
        </InputContainer>

        <ButtonsContainer>
          <TextButton label='Discard' variant='danger' onClick={closeHandler} />
          <TextButton
            label={`${edit ? `Edit` : `Submit`}`}
            variant='success'
            onClick={() => submitHandler()}
          />
        </ButtonsContainer>
      </AddForm>
    </WithModal>
  )
}

const AddForm = styled.div`
  width: 100%;
  padding: 30px 60px;
  padding-top: 14px;
`

const InputContainer = styled.div`
  margin: 40px 0;
`

const ButtonsContainer = styled.div`
  ${flexCenter({ justifyContent: 'space-between' })};
`

export default TimeBlockEditor
