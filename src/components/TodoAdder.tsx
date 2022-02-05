import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { todoAdded } from '../redux/slices/todoSlice'
import TextInput from './TextInput'

const TodoAdder: React.FC<TodoAdderProps> = ({ listId }) => {
  const dispatch = useDispatch()

  const [todoTitle, setTodoTitle] = useState<string>('')
  const [todoInputError, setTodoInputError] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const submitHandler = () => {
    if (todoTitle.length === 0) {
      setTodoInputError(true)
      setTimeout(() => {
        setTodoInputError(false)
      }, 5000)
      return
    }
    dispatch(todoAdded({ title: todoTitle, category: listId }))
    setTodoTitle('')
  }

  const keyboardSumbit = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      submitHandler()
    }
  }

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.addEventListener('keydown', keyboardSumbit)
    }
    return () => {
      if (inputRef && inputRef.current) {
        inputRef.current.removeEventListener('keydown', keyboardSumbit)
      }
    }
  })

  return (
    <TodoAdderContainer>
      <TextInput
        name='todo'
        title='Add Todo'
        onChangeHandler={event => setTodoTitle(event.target.value)}
        inputValue={todoTitle}
        error={todoInputError}
        inputRef={inputRef}
        animatedLabel={false}
        fullWidth
      />
    </TodoAdderContainer>
  )
}

type TodoAdderProps = {
  listId?: string
}

TodoAdder.defaultProps = {
  listId: 'today'
}

const TodoAdderContainer = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.accent};
  border-radius: 8px;
`

export default TodoAdder
