import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { ITodo } from '../@types/TodoInterfaces'
import { selectTodos } from '../redux/slices/todoSlice'
import TodoAdder from './TodoAdder'
import TodoComponent from './TodoComponent'
import { flexCenter } from '../styles/styleUtils'

const TodoList: React.FC<TodoListProps> = ({ listId }) => {
  const title = listId
  const todosData = useSelector(selectTodos)

  const todos: React.ReactElement[] = []
  todosData.forEach((todo: ITodo) => {
    if (todo.category === listId) {
      todos.push(<TodoComponent key={todo.id} todo={todo} />)
    }
  })

  return (
    <TodoListContainer>
      <ListHeading>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </ListHeading>
      <ListContainer>
        {todos.length !== 0 ? todos : <EmptyDiv>No todos yet...</EmptyDiv>}
      </ListContainer>
      <AdderContainer>
        <TodoAdder listId={listId} />
      </AdderContainer>
    </TodoListContainer>
  )
}

type TodoListProps = {
  listId?: string
}

TodoList.defaultProps = {
  listId: 'today'
}

const TodoListContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 60%;
  position: relative;
  flex: 1;
`

const ListHeading = styled.div`
  height: 60px;
  position: sticky;
  top: 0;
  font-size: 32px;
  font-weight: bold;
`

const ListContainer = styled.div`
  ${flexCenter({ flexDirection: 'column', justifyContent: 'flex-start' })};
  flex-grow: 1;
  height: 100%;
  overflow: auto;
  padding: 10px;
`

const EmptyDiv = styled(ListContainer)`
  ${flexCenter({ flexDirection: 'column' })};
`

const AdderContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  padding-right: 10px;
`

export default TodoList
