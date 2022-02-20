import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import CheckBox from './CheckBox'
import BinIcon from '../assets/icons/Bin.svg'
import { ITodo } from '../@types/TodoInterfaces'
import { todoToggled, todoDeleted } from '../redux/slices/todoSlice'
import { buttonStyles, flexCenter } from '../styles/styleUtils'

const TodoComponent: React.FC<TodoComponentProps> = ({ todo }) => {
  const dispatch = useDispatch()

  const { title, isCompleted } = todo

  const toggleHandler = () => {
    dispatch(todoToggled(todo))
  }

  const deleteHandler = () => {
    dispatch(todoDeleted(todo))
  }

  return (
    <TodoComponentContainer>
      <TodoComponentSec>
        <CheckBox checked={isCompleted} onClick={toggleHandler} />
        <TodoHeading isCompleted={isCompleted}>{title}</TodoHeading>
      </TodoComponentSec>
      <div className='delete-sec'>
        <IconButton danger onClick={deleteHandler}>
          <BinIcon />
        </IconButton>
      </div>
    </TodoComponentContainer>
  )
}

type TodoComponentProps = {
  todo: ITodo
}

const TodoComponentContainer = styled.div`
  ${flexCenter({ justifyContent: 'space-between' })};
  width: 100%;
  background: ${({ theme }) => theme.shade1};
  border-radius: 8px;
  padding: 14px 40px;
  margin: 4px 14px;
  margin-left: 0;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);

  .delete-sec {
    opacity: 0;
    transition: opacity 0.1s ease-in;
  }

  &:hover {
    .delete-sec {
      opacity: 1;
    }
  }
`

const TodoHeading = styled.p<{ isCompleted: boolean }>`
  font-size: 18px;
  margin-left: 30px;
  ${({ isCompleted }) => isCompleted && `text-decoration: line-through`};
`

const TodoComponentSec = styled.div`
  ${flexCenter()};
`

const IconButton = styled.button<{ danger?: boolean }>`
  ${buttonStyles()};
  ${flexCenter()};
  border: 2px solid ${({ danger }) => (danger ? `#e24446` : `#2C9AFF`)};
  height: 30px;
  width: 30px;
  outline: none;
  border-radius: 8px;

  & > svg {
    transform: scale(0.8);
    fill: ${({ danger }) => (danger ? `#e24446` : `#2C9AFF`)};
  }
`

export default TodoComponent
