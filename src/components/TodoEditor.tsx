import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'

import { ITodo } from '../@types/TodoInterface'
import WithModal from '../wrappers/WithModal'
import CheckBox from './CheckBox'
import TextArea from './TextArea'
import TextInput from './TextInput'
import { todoDeleted, todoUpdated } from '../redux/slices/todosSlice'
import DayWithTimeInput from './DayWithTimeInput'
import { checkValidDate, checkValidTime12 } from '../utils/timeUtils'
import { updateTimeStamps } from '../redux/slices/appSlice'
import { checkIsDefinedListId } from '../utils/todoUtils'
import { useAppDispatch } from '../redux/hook'
import { flexCenter } from '../styles/styleUtils'

const TodoEditor: React.FC<TodoEditorProps> = ({ todo, closeHandler }) => {
  const dispatch = useAppDispatch()

  const [isCompleted, setIsCompleted] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(false)
  const [isRecurringEnabled, setIsRecurringEnabled] = useState<boolean>(false)

  const [day, setDay] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [hours, setHours] = useState<string>('')
  const [minutes, setMinutes] = useState<string>('')
  const [amPm, setAmPm] = useState<string>('')

  const [isDefinedList, setIsDefinedList] = useState<boolean>(true)

  const [titleError, setTitleError] = useState<boolean>(false)
  const [dateTimeError, setDateTimeError] = useState<boolean>(false)

  const checkDefinedListTodo = () => {
    let pdl = false
    todo.lists.forEach(lid => {
      if (checkIsDefinedListId(lid)) {
        pdl = true
      }
    })
    if (pdl) {
      setIsDefinedList(true)
    } else {
      setIsDefinedList(false)
    }
  }

  useEffect(() => {
    setIsCompleted(todo.isCompleted)
    setTitle(todo.title.trim())
    setDescription(todo.description.trim())

    let time = new Date()
    if (todo.remainder) {
      time = new Date(todo.remainder)
      setNotificationEnabled(true)
    }

    setDay(String(time.getDate()))
    setMonth(String(time.getMonth() + 1))
    setYear(String(time.getFullYear()))
    let timeHours = time.getHours()
    setAmPm('am')
    if (timeHours > 12) {
      timeHours -= 12
      setAmPm('pm')
    }
    setHours(String(timeHours))
    setMinutes(String(time.getMinutes()))
    setIsRecurringEnabled(todo.isRecurringEveryday)

    checkDefinedListTodo()
  }, [])

  const submitHandler = (close = () => {}) => {
    let error = false
    if (title.length === 0) {
      setTitleError(true)
      error = true
      setTimeout(() => {
        setTitleError(false)
      }, 5000)
    }

    const newDay = Number(day)
    const newMonth = Number(month)
    const newYear = Number(year)
    const newHours = Number(hours)
    const newMinutes = Number(minutes)
    const newAmPm = amPm.toLowerCase()

    const amPmError = newAmPm === 'am' || newAmPm === 'pm'

    if (
      (Number.isNaN(newDay) ||
        Number.isNaN(newMonth) ||
        Number.isNaN(newYear) ||
        Number.isNaN(newHours) ||
        Number.isNaN(newMinutes) ||
        !amPmError) &&
      !checkValidDate(newDay, newMonth, newYear) &&
      !checkValidTime12(newHours, newMinutes)
    ) {
      error = true
      setDateTimeError(true)
      setTimeout(() => {
        setDateTimeError(false)
      }, 5000)
    }

    if (error) return

    close()

    const newTodo: ITodo = {
      ...todo,
      isCompleted,
      title,
      description,
      isRecurringEveryday: isRecurringEnabled
    }

    if (notificationEnabled) {
      const rem = new Date()
      rem.setFullYear(newYear, newMonth - 1, newDay)
      if (newAmPm === 'pm' && newHours !== 12) {
        rem.setHours(newHours + 12, newMinutes, 0, 0)
      } else rem.setHours(newHours, newMinutes, 0, 0)
      newTodo.remainder = rem.valueOf()
    } else if (!notificationEnabled && todo.remainder) {
      delete newTodo.remainder
    }

    setTimeout(() => {
      dispatch(
        todoUpdated({
          oldTodo: todo,
          newTodo
        })
      )
      dispatch(updateTimeStamps())
    }, 150)
  }

  const deleteTodo = (close = () => {}) => {
    close()
    setTimeout(() => {
      dispatch(todoDeleted(todo.id))
      dispatch(updateTimeStamps())
    }, 150)
  }

  return (
    <WithModal
      closeHandler={closeHandler}
      modalTitle='Edit'
      mainButtonProps={{ label: 'Edit', onClick: submitHandler }}
      secButtonProps={{ label: 'Delete', onClick: deleteTodo }}
      bodyPadding='0 30px 30px 30px'
    >
      <TodoEditorContainer>
        <SecContainer>
          <CheckBox checked={isCompleted} onClick={() => setIsCompleted(!isCompleted)} />
          <TodoTitle>
            <TextInput
              name='todoTitle'
              title='Title'
              fullWidth
              inputValue={title}
              animatedLabel
              onChangeHandler={(event: ChangeEvent<HTMLInputElement>) =>
                setTitle(event.target.value)
              }
              error={titleError}
            />
          </TodoTitle>
        </SecContainer>
        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
          <SecContainer>
            <CheckBox
              checked={notificationEnabled}
              onClick={() => setNotificationEnabled(!notificationEnabled)}
            />
            <span style={{ marginLeft: '20px' }}>Set Remainder</span>
          </SecContainer>
          {notificationEnabled && (
            <DayWithTimeInput
              error={dateTimeError}
              disabled={!notificationEnabled}
              day={day}
              setDay={setDay}
              month={month}
              setMonth={setMonth}
              year={year}
              setYear={setYear}
              hours={hours}
              setHours={setHours}
              minutes={minutes}
              setMinutes={setMinutes}
              amPm={amPm}
              setAmPm={setAmPm}
            />
          )}
        </div>
        {isDefinedList && (
          <div style={{ marginTop: '40px', marginBottom: '40px' }}>
            <SecContainer>
              <CheckBox
                checked={isRecurringEnabled}
                onClick={() => setIsRecurringEnabled(!isRecurringEnabled)}
              />
              <span style={{ marginLeft: '20px' }}>Recur Everyday</span>
            </SecContainer>
          </div>
        )}
        <TextArea
          name='todoDescription'
          inputValue={description}
          title='Description'
          onChangeHandler={(event: ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value)
          }
        />
      </TodoEditorContainer>
    </WithModal>
  )
}

type TodoEditorProps = {
  todo: ITodo
  closeHandler: () => void
}

const TodoEditorContainer = styled.div`
  margin: 40px 0 30px 0;
`

const TodoTitle = styled.div`
  margin-left: 20px;
  width: 250px;
`

const SecContainer = styled.div`
  ${flexCenter({ justifyContent: 'flex-start' })};
  margin-bottom: 20px;
`

export default TodoEditor
