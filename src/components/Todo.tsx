import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import { flexCenter } from '../styles/styleUtils'
import CheckBox from './CheckBox'
import {
  selectTodoById,
  todoStarredToggled,
  todoToggled
} from '../redux/slices/todosSlice'
import TodoEditor from './TodoEditor'
import { IState } from '../@types/StateInterfaces'
import StarFilledIcon from '../assets/icons/StarFilled.svg'
import StarOutlineIcon from '../assets/icons/StarOutline.svg'

const Todo: React.FC<TodoProps> = ({ todoId, index }) => {
  const dispatch = useDispatch()

  const [showTodoEditor, setShowTodoEditor] = useState<boolean>(false)

  const todo = useSelector((state: IState) => selectTodoById(state, todoId))

  const ref = useRef<HTMLDivElement>()

  const toggle = () => {
    dispatch(todoToggled(todo.id))
  }

  const openEditor = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (ref.current && ref.current.contains(event.target as Node)) {
      return
    }
    setShowTodoEditor(true)
  }

  const toggleStarred = () => {
    dispatch(todoStarredToggled(todo.id))
  }

  return (
    <>
      {showTodoEditor && (
        <TodoEditor todo={todo} closeHandler={() => setShowTodoEditor(false)} />
      )}
      <Draggable draggableId={todo.id} index={index}>
        {provided => (
          <TodoContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onAuxClick={openEditor}
            onClick={openEditor}
          >
            <div ref={ref}>
              <CheckBox checked={todo.isCompleted} onClick={toggle} />
            </div>
            <TodoTitle>
              <span>{todo.title}</span>
            </TodoTitle>
            <StarButton
              starred={todo.isStarred}
              onClick={toggleStarred}
              ref={ref}
            >
              {todo.isStarred ? <StarFilledIcon /> : <StarOutlineIcon />}
            </StarButton>
          </TodoContainer>
        )}
      </Draggable>
    </>
  )
}

type TodoProps = {
  todoId: string
  index: number
}

const TodoContainer = styled.div`
  ${flexCenter({ justifyContent: 'flex-start' })};
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.shade1};
  margin: 10px 0;
  border-radius: 8px;
  padding: 0 30px;
  border: 1px solid lightgrey;
  cursor: default !important;
`

const TodoTitle = styled.div`
  width: 100%;
  padding-left: 30px;
`

const StarButton = styled.div<{ starred?: boolean }>`
  cursor: pointer;
  transition: all 0.2s ease-out;

  svg {
    fill: ${({ theme, starred }) => {
      if (starred) {
        return theme.name === 'dark' ? `#FFD700` : theme.accent
      }
      return theme.name === 'dark' ? theme.accent : `lightgrey`
    }};
    transform: scale(0.7);
  }

  &:active {
    transform: scale(0.9);
  }
`

export default Todo
