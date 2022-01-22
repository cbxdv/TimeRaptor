import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import WithModal from '../hooks/WithModal.jsx'
import { blockAdded, blockUpdated } from '../redux/slices/timeBlocksSlice.js'
import { getDurationMinutes } from '../utils/timeUtils.js'
import ColorPicker from './ColorPicker.jsx'
import DayInput from './DayInput.jsx'
import TextArea from './TextArea.jsx'
import TextButton from './TextButton.jsx'
import TextInput from './TextInput.jsx'
import TimeInput from './TimeInput.jsx'
import { flexCenter } from '../styles/styleUtils.js'

const TimeBlockEditor = ({ closeHandler, edit = false, currentBlock = null }) => {
  const dispatch = useDispatch()

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

  const [titleError, setTitleError] = useState(false)
  const [timeError, setTimeError] = useState(false)

  const inputRef = useRef(null)

  const checkData = () => {
    let error = false

    // Title length check
    if (title.length === 0) {
      error = true
      setTitleError(true)
      setTimeout(() => {
        setTitleError(false)
      }, 5000)
    }

    // End time not being before start time check
    const duration = getDurationMinutes(startTime, endTime)
    if (duration <= 0) {
      error = true
      setTimeError(true)
      setTimeout(() => {
        setTimeError(false)
      }, 5000)
    }

    return !error
  }

  const submitHandler = () => {
    if (!checkData()) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const newBlock = {
      ...currentBlock,
      title,
      day,
      startTime,
      endTime,
      duration: getDurationMinutes(startTime, endTime),
      blockColor,
      description,
    }
    if (edit) {
      // edit block
      dispatch(blockUpdated({ oldBlock: currentBlock, newBlock }))
    } else {
      // add new block
      dispatch(blockAdded(newBlock))
    }
    closeHandler()
  }

  const keyBindHandler = (event) => {
    if (event.key === 'Enter') {
      submitHandler()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyBindHandler)
    return () => {
      document.removeEventListener('keydown', keyBindHandler)
    }
  })

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
            title='Title'
            name='title'
            inputValue={title}
            error={titleError}
            onChangeHandler={(event) => setTitle(event.target.value)}
          />
        </InputContainer>

        <InputContainer ref={inputRef}>
          <DayInput title='Day' value={day} valueSetHandler={(day) => setDay(day)} />
        </InputContainer>

        <InputContainer>
          <TimeInput
            error={timeError}
            title='Start Time'
            value={startTime}
            valueSetHandler={(time) => setStartTime(time)}
          />
        </InputContainer>

        <InputContainer>
          <TimeInput
            error={timeError}
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
  padding: 0 60px;
  padding-bottom: 40px;
`

const InputContainer = styled.div`
  margin: 40px 0;
`

const ButtonsContainer = styled.div`
  ${flexCenter({ justifyContent: 'space-between' })};
`

export default TimeBlockEditor
