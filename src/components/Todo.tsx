import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { flexCenter } from '../styles/styleUtils'
import { ITodo, TodoDayTypes } from '../@types/TodoInterface'
import CheckBox from './CheckBox'
import { toggleTodo } from '../redux/slices/todosSlice'

const Todo: React.FC<TodoProps> = ({ todo, listName }) => {
  const dispatch = useDispatch()
  const toggle = () => {
    dispatch(
      toggleTodo({
        day: listName,
        todoId: todo.id
      })
    )
  }
  return (
    <TodoContainer>
      <CheckBox checked={todo.isCompleted} onClick={toggle} />
      <TodoTitle>{todo.title}</TodoTitle>
    </TodoContainer>
  )
}

type TodoProps = {
  todo: ITodo
  listName: TodoDayTypes
}

const TodoContainer = styled.div`
  ${flexCenter({ justifyContent: 'flex-start' })};
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.shade1};
  margin: 10px 0;
  border-radius: 8px;
  padding: 0 30px;
`

const TodoTitle = styled.div`
  margin-left: 30px;
`

export default Todo
