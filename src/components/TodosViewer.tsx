import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { flexCenter } from '../styles/styleUtils'
import AddCircleIcon from '../assets/icons/AddCircle.svg'
import { addTodo, selectTodosByDay } from '../redux/slices/todosSlice'
import { IState } from '../@types/StateInterfaces'
import { ITodo, TodoDayTypes } from '../@types/TodoInterface'
import Todo from './Todo'

const TodosViewer: React.FC<TodosViewerProps> = ({ listName }) => {
  const todos = useSelector((state: IState) =>
    selectTodosByDay(state, listName)
  )
  return (
    <TodosViewerContainer>
      <h2>{listName.at(0).toUpperCase() + listName.substring(1)}</h2>
      <TodosContainer>
        {todos.length !== 0 ? (
          todos.map((todo: ITodo) => (
            <Todo key={todo.id} todo={todo} listName={listName} />
          ))
        ) : (
          <EmptyTodosContainer>No todos</EmptyTodosContainer>
        )}
      </TodosContainer>
      <TodoAdderContainer>
        <TodoInputComponent listName={listName} />
      </TodoAdderContainer>
    </TodosViewerContainer>
  )
}

type TodosViewerProps = {
  listName?: TodoDayTypes
}

TodosViewer.defaultProps = {
  listName: 'today'
}

const TodoInputComponent: React.FC<TodoInputComponentProps> = ({
  listName
}) => {
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch()
  const addHandler = () => {
    if (inputText.length === 0) {
      return
    }
    dispatch(
      addTodo({
        day: listName,
        todo: {
          id: '',
          title: inputText,
          isCompleted: false
        }
      })
    )
    setInputText('')
  }
  return (
    <TodoInputContainer>
      <TodoInput
        value={inputText}
        onChange={action => setInputText(action.target.value)}
        placeholder='Enter a todo'
      />
      <AddContainer onClick={() => addHandler()}>
        <AddCircleIcon />
      </AddContainer>
    </TodoInputContainer>
  )
}

type TodoInputComponentProps = {
  listName: TodoDayTypes
}

const TodosViewerContainer = styled.div`
  ${flexCenter({
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  })};
  height: 100vh;
  padding: 0 30px;
  padding-top: 50px;
  position: relative;
`

const TodosContainer = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 30px;
  overflow-y: scroll;
  padding: 0 30px;
`

const EmptyTodosContainer = styled.div`
  ${flexCenter()};
  height: 100%;
`

const TodoAdderContainer = styled.div`
  width: 100%;
  padding: 30px;
  height: 110px;
`

const TodoInputContainer = styled.div`
  ${flexCenter()};
  width: 100%;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 8px;
`

const TodoInput = styled.input`
  width: 90%;
  height: 100%;
  outline: none;
  border: transparent;
  border-radius: 8px;
  padding: 0 20px;
  font-family: Outfit;
  font-size: 16px;
  background: transparent;
  color: ${({ theme }) => theme.text};
`

const AddContainer = styled.div`
  ${flexCenter()};
  width: 10%;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.text};
  }

  &:active {
    transform: scale(0.9);
  }
`

export default TodosViewer
