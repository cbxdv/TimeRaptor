import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { DragDropContext, DropResult, Droppable, Draggable } from 'react-beautiful-dnd'

import { flexCenter } from '../styles/styleUtils'
import { IState } from '../@types/StateInterfaces'
import { selectTodosByListId, todoOrderUpdated, todoToggled } from '../redux/slices/todosSlice'
import { ITodo } from '../@types/TodoInterface'
import CheckBox from './CheckBox'

const TodoColumn: React.FC<TodosColumnProps> = ({ listId }) => {
  const todos = useSelector((state: IState) => selectTodosByListId(state, listId))
  const dispatch = useDispatch()

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result
    if (!destination) {
      return
    }
    if (source.droppableId === destination.droppableId && source.index !== destination.index) {
      dispatch(
        todoOrderUpdated({
          sourceIndex: source.index,
          destinationIndex: destination.index,
          listId: source.droppableId,
          todoId: draggableId
        })
      )
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TodosColumnContainer>
        <TodoHeading isToday={listId === 'today'}>
          {listId === 'today' ? 'Today' : 'Tomorrow'}
        </TodoHeading>
        <Droppable droppableId={listId}>
          {provided => (
            <ColumnMain ref={provided.innerRef} {...provided.droppableProps}>
              {todos.map((todo, index) => (
                <Todo key={todo.id} todo={todo} index={index} />
              ))}

              {provided.placeholder}

              {/* hack: for some width at last */}
              <div style={{ fontSize: '1px' }}>&nbsp;</div>
            </ColumnMain>
          )}
        </Droppable>
      </TodosColumnContainer>
    </DragDropContext>
  )
}

interface TodosColumnProps {
  listId: string
}

const Todo: React.FC<TodoProps> = ({ todo, index }) => {
  const dispatch = useDispatch()

  const toggle = () => {
    dispatch(todoToggled(todo.id))
  }

  return (
    <Draggable draggableId={todo.id} index={index}>
      {provided => (
        <TodoContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CheckBoxContainer>
            <CheckBox checked={todo.isCompleted} onClick={toggle} />
          </CheckBoxContainer>
          <TodoText>{todo.title}</TodoText>
        </TodoContainer>
      )}
    </Draggable>
  )
}

interface TodoProps {
  todo: ITodo
  index: number
}

const TodosColumnContainer = styled.div`
  ${flexCenter({ alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start' })}
  width: 100%;
  height: 80vh;
  position: sticky;
  left: 0;
  top: 0;
  padding-left: 10px;
  padding-right: 5px;
  overflow: scroll;
`

const TodoHeading = styled.div<{ isToday?: boolean }>`
  ${flexCenter({ justifyContent: 'flex-start' })}
  font-family: Outfit;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  width: 100%;
  color: ${({ isToday }) => isToday && `#FD2513`};
`

const ColumnMain = styled.div`
  width: 100%;
  height: 100%;
`

const TodoContainer = styled.div`
  ${flexCenter({ justifyContent: 'flex-start' })}
  background-color: ${({ theme }) => (theme.name === 'dark' ? theme.shade1 : theme.secondary)};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 10px;
  max-width: 100%;
  cursor: default !important;
`

const CheckBoxContainer = styled.div`
  transform: scale(0.7);
`

const TodoText = styled.div`
  margin-left: 10px;
`

export default TodoColumn
