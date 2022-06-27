import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import WithModal from '../wrappers/WithModal'
import { blockAdded, blockUpdated } from '../redux/slices/timetableSlice'
import {
  blockAdded as dayPlannerBlockAdded,
  blockUpdated as dayPlannerBlockUpdated
} from '../redux/slices/dayPlannerSlice'
import { getCurrentTimeAndDay, getDurationMinutes } from '../utils/timeUtils'
import ColorPicker from './ColorPicker'
import DayInput from './DayInput'
import TextArea from './TextArea'
import TextInput from './TextInput'
import TimeInput from './TimeInput'

import { DayStringTypes, ITimeObject } from '../@types/DayAndTimeInterfaces'
import { ColorStringTypes, ITimeBlock } from '../@types/TimeBlockInterfaces'
import { updateTimeStamps } from '../redux/slices/appSlice'
import {
  DayPlannerDayTypes,
  IDayPlannerBlock
} from '../@types/DayPlannerInterfaces'

const TimeBlockEditor: React.FC<TimeBlockEditorProps> = ({
  closeHandler,
  edit = false,
  currentBlock = null,
  dayPlanner,
  dpDay,
  currentDayPlannerBlock
}) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState<string>('')
  const [day, setDay] = useState<DayStringTypes>('monday')
  const [dayPlannerDay, setDayPlannerDay] =
    useState<DayPlannerDayTypes>('currentDay')
  const [startTime, setStartTime] = useState<ITimeObject>({
    hours: 1,
    minutes: 0,
    pm: false
  })
  const [endTime, setEndTime] = useState<ITimeObject>({
    hours: 1,
    minutes: 0,
    pm: false
  })
  const [blockColor, setBlockColor] = useState<ColorStringTypes>('decoPeach')
  const [description, setDescription] = useState<string>('')

  const [titleError, setTitleError] = useState<boolean>(false)
  const [timeError, setTimeError] = useState<boolean>(false)

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

  const submitHandler = (close = () => {}) => {
    if (!checkData()) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    close()

    if (dayPlanner) {
      const newBlock: IDayPlannerBlock = {
        ...currentDayPlannerBlock,
        title,
        day: dayPlannerDay,
        startTime,
        endTime,
        duration: getDurationMinutes(startTime, endTime),
        blockColor,
        description
      }
      setTimeout(() => {
        if (edit) {
          // update day planner block
          dispatch(
            dayPlannerBlockUpdated({
              oldBlock: currentDayPlannerBlock,
              newBlock
            })
          )
        } else {
          // add day planner block
          dispatch(dayPlannerBlockAdded(newBlock))
        }
        dispatch(updateTimeStamps())
      }, 150)
    } else {
      const newBlock: ITimeBlock = {
        ...currentBlock,
        title,
        day,
        startTime,
        endTime,
        duration: getDurationMinutes(startTime, endTime),
        blockColor,
        description
      }
      setTimeout(() => {
        if (edit) {
          // edit block
          dispatch(blockUpdated({ oldBlock: currentBlock, newBlock }))
        } else {
          // add new block
          dispatch(blockAdded(newBlock))
        }
        const currentDay = getCurrentTimeAndDay().day
        if (
          day === currentDay ||
          (currentBlock && currentBlock.day === currentDay)
        ) {
          dispatch(updateTimeStamps())
        }
      }, 150)
    }
  }

  useEffect(() => {
    if (dayPlanner) {
      if (
        !currentDayPlannerBlock ||
        Object.keys(currentDayPlannerBlock).length === 0
      ) {
        return
      }
      setTitle(currentDayPlannerBlock.title)
      setDayPlannerDay(dpDay)
      setStartTime(currentDayPlannerBlock.startTime)
      setEndTime(currentDayPlannerBlock.endTime)
      setBlockColor(currentDayPlannerBlock.blockColor)
      setDescription(currentDayPlannerBlock.description)
    } else {
      if (!currentBlock || Object.keys(currentBlock).length === 0) {
        return
      }
      setTitle(currentBlock.title)
      setDay(currentBlock.day)
      setStartTime(currentBlock.startTime)
      setEndTime(currentBlock.endTime)
      setBlockColor(currentBlock.blockColor)
      setDescription(currentBlock.description)
    }
  }, [])

  const clearState = () => {
    setTitle('')
    setDay('monday')
    setDayPlannerDay('currentDay')
    setStartTime({ hours: 1, minutes: 0, pm: false })
    setEndTime({ hours: 1, minutes: 0, pm: false })
    setBlockColor('decoPeach')
    setDescription('')
    inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <WithModal
      modalTitle='Add New Block'
      closeHandler={closeHandler}
      mainButtonProps={{ label: edit ? 'Edit' : 'Add', onClick: submitHandler }}
      secButtonProps={{ label: 'Clear', onClick: clearState }}
      bodyPadding='0 50px 30px 50px'
    >
      <AddForm>
        <InputContainer>
          <TextInput
            title='Title'
            name='title'
            inputValue={title}
            error={titleError}
            onChangeHandler={(event: ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
          />
        </InputContainer>

        <InputContainer ref={inputRef}>
          {dayPlanner ? (
            <DayInput
              title='Day'
              value={dayPlannerDay}
              dayPlanner
              dayPlannerValueSetHandler={(selectedDay: DayPlannerDayTypes) =>
                setDayPlannerDay(selectedDay)
              }
            />
          ) : (
            <DayInput
              title='Day'
              value={day}
              valueSetHandler={(selectedDay: DayStringTypes) =>
                setDay(selectedDay)
              }
            />
          )}
        </InputContainer>

        <InputContainer>
          <TimeInput
            error={timeError}
            title='Start Time'
            value={startTime}
            valueSetHandler={(time: ITimeObject) => setStartTime(time)}
          />
        </InputContainer>

        <InputContainer>
          <TimeInput
            error={timeError}
            title='End Time'
            value={endTime}
            valueSetHandler={(time: ITimeObject) => setEndTime(time)}
          />
        </InputContainer>

        <InputContainer>
          <ColorPicker
            title='Block Color'
            color={blockColor}
            valueSetHandler={(color: ColorStringTypes) => setBlockColor(color)}
          />
        </InputContainer>

        <InputContainer>
          <TextArea
            title='Description'
            name='description'
            inputValue={description}
            onChangeHandler={(event: ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
          />
        </InputContainer>
      </AddForm>
    </WithModal>
  )
}

type TimeBlockEditorProps = {
  closeHandler: () => void
  edit?: boolean
  currentBlock?: ITimeBlock | null
  dayPlanner?: boolean
  dpDay?: DayPlannerDayTypes
  currentDayPlannerBlock?: IDayPlannerBlock | null
}

TimeBlockEditor.defaultProps = {
  edit: false,
  currentBlock: null,
  dayPlanner: false,
  dpDay: 'currentDay',
  currentDayPlannerBlock: null
}

const AddForm = styled.div`
  width: 100%;
`

const InputContainer = styled.div`
  margin: 40px 0;
`

export default TimeBlockEditor
