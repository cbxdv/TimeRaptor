import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import CheckBox from './CheckBox'
import { selectTodoById, todoStarredToggled, todoToggled } from '../redux/slices/todosSlice'
import TodoEditor from './TodoEditor'
import { IState } from '../@types/StateInterfaces'
import StarFilledIcon from '../assets/icons/StarFilled.svg'
import StarOutlineIcon from '../assets/icons/StarOutline.svg'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { flexCenter } from '../styles/styleUtils'

const Todo: React.FC<TodoProps> = ({ todoId, index }) => {
  const dispatch = useAppDispatch()

  const [showTodoEditor, setShowTodoEditor] = useState<boolean>(false)

  const todo = useAppSelector((state: IState) => selectTodoById(state, todoId))

  const boxRef = useRef<HTMLDivElement>()
  const starRef = useRef<HTMLDivElement>()

  const toggle = () => {
    dispatch(todoToggled(todo.id))
  }

  const openEditor = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (boxRef.current && boxRef.current.contains(event.target as Node)) {
      return
    }
    if (starRef.current && starRef.current.contains(event.target as Node)) {
      return
    }
    setShowTodoEditor(true)
  }

  const toggleStarred = () => {
    dispatch(todoStarredToggled(todo.id))
  }

  return (
    <>
      {showTodoEditor && <TodoEditor todo={todo} closeHandler={() => setShowTodoEditor(false)} />}
      <Draggable draggableId={todo.id} index={index}>
        {provided => (
          <TodoContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onAuxClick={openEditor}
            onClick={openEditor}
          >
            <div ref={boxRef}>
              <CheckBox checked={todo.isCompleted} onClick={toggle} />
            </div>
            <TodoTitle>
              <span>{todo.title}</span>
            </TodoTitle>
            <StarButton starred={todo.isStarred} onClick={toggleStarred} ref={starRef}>
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
