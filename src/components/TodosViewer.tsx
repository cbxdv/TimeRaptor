import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'

import { flexCenter } from '../styles/styleUtils'
import AddCircleIcon from '../assets/icons/AddCircle.svg'
import {
  todoAdded,
  todoOrderUpdated,
  selectTodoListById
} from '../redux/slices/todosSlice'
import { IState } from '../@types/StateInterfaces'
import Todo from './Todo'
import {
  selectTimetableEndNotifications,
  selectTimetableEndNotificationsBefore,
  selectTimetableStartNotifications,
  selectTimetableStartNotificationsBefore,
  selectTodoNotifications
} from '../redux/slices/configsSlice'
import { updateTimeStamps } from '../redux/slices/appSlice'

const TodosViewer: React.FC<TodosViewerProps> = ({ listId }) => {
  const dispatch = useDispatch()

  const todosList = useSelector((state: IState) =>
    selectTodoListById(state, listId)
  )

  if (!todosList) return <>Error</>

  const startNotificationsState = useSelector(selectTimetableStartNotifications)
  const endNotificationsState = useSelector(selectTimetableEndNotifications)
  const startNotificationsBefore = useSelector(
    selectTimetableStartNotificationsBefore
  )
  const endNotificationsBefore = useSelector(
    selectTimetableEndNotificationsBefore
  )
  const todoNotifications = useSelector(selectTodoNotifications)

  useEffect(() => {
    dispatch(
      updateTimeStamps({
        startTimetableNotifications: startNotificationsState,
        endTimetableNotifications: endNotificationsState,
        startTimetableNotificationsBefore: startNotificationsBefore,
        endTimetableNotificationsBefore: endNotificationsBefore,
        todoNotifications
      })
    )
  }, [todosList.tasks])

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result
    if (!destination) {
      return
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index !== destination.index
    ) {
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
      <TodosViewerContainer>
        <h2>{todosList.title}</h2>
        {todosList.description && <p>{todosList.description}</p>}

        <Droppable droppableId={todosList.id}>
          {provided => (
            <TodosContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todosList.tasks.length !== 0 ? (
                todosList.tasks.map((todoId: string, index: number) => (
                  <Todo key={todoId} todoId={todoId} index={index} />
                ))
              ) : (
                <EmptyTodosContainer>No todos</EmptyTodosContainer>
              )}
              {provided.placeholder}
            </TodosContainer>
          )}
        </Droppable>
        {listId !== 'starred' ? (
          <TodoAdderContainer>
            <TodoInputComponent listId={listId} />
          </TodoAdderContainer>
        ) : (
          <div style={{ height: '30px', width: '100%' }} />
        )}
      </TodosViewerContainer>
    </DragDropContext>
  )
}

type TodosViewerProps = {
  listId?: string
}

TodosViewer.defaultProps = {
  listId: 'today'
}

const TodoInputComponent: React.FC<TodoInputComponentProps> = ({ listId }) => {
  const dispatch = useDispatch()

  const [inputText, setInputText] = useState('')

  const inputRef = useRef(null)

  const addHandler = () => {
    if (inputText.length === 0) {
      return
    }
    const listIds = []
    if (listId === 'today' || listId === 'tomorrow' || listId === 'later') {
      listIds.push('all')
    }
    listIds.push(listId)
    dispatch(
      todoAdded({
        id: '',
        title: inputText.trim(),
        description: '',
        isCompleted: false,
        lists: listIds,
        isStarred: false
      })
    )
    setInputText('')
  }

  const keyBindHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && inputRef.current === document.activeElement) {
      addHandler()
    }
    if (event.key === 'Escape' && inputRef.current === document.activeElement) {
      inputRef.current.blur()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyBindHandler)
    return () => {
      document.removeEventListener('keydown', keyBindHandler)
    }
  })

  return (
    <TodoInputContainer>
      <TodoInput
        ref={inputRef}
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
  listId: string
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
