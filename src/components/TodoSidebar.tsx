import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Logo from '../assets/Logo.png'
import { flexCenter } from '../styles/styleUtils'

const TodoSidebar: React.FC<TodoSidebarProps> = ({ listId }) => {
  const lists = [
    {
      id: 'today',
      name: 'Today'
    },
    {
      id: 'tomorrow',
      name: 'Tomorrow'
    },
    {
      id: 'later',
      name: 'Later'
    }
  ]
  return (
    <TodoSidebarContainer>
      <AppInfo>
        <Link to='/'>
          <img src={Logo} alt='Time Raptor' className='header-logo' />
        </Link>
        <h3>Todo List</h3>
      </AppInfo>
      <ListHeading>DAYS</ListHeading>
      <ListComponentContainer>
        {lists.map(({ id, name }) => (
          <Link to={`/todo/${id}`} key={id}>
            <ListComponent selected={listId === id}>{name}</ListComponent>
          </Link>
        ))}
      </ListComponentContainer>
    </TodoSidebarContainer>
  )
}

type TodoSidebarProps = {
  listId?: string
}

TodoSidebar.defaultProps = {
  listId: 'today'
}

const TodoSidebarContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow: scroll;
  background: ${({ theme }) =>
    theme.name === 'dark' ? theme.shade1 : theme.accent};
  color: ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.shade1)};
  width: 250px;
  position: fixed;
  left: 0;
  top: 0;
`

const AppInfo = styled.div`
  ${flexCenter()};
  background: ${({ theme }) =>
    theme.name === 'dark' ? theme.shade1 : theme.accent};
  height: 100px;
  width: 100%;
  margin-bottom: 30px;
  position: sticky;
  top: 0;

  .header-logo {
    height: 50px;
    width: 50px;
  }

  h3 {
    margin-left: 20px;
  }
`

const ListHeading = styled.p`
  padding-left: 20px;
  margin-bottom: 20px;
  margin-top: 30px;
`

const ListComponentContainer = styled.ul`
  list-style: none;
`

const ListComponent = styled.li<{ selected?: boolean }>`
  ${flexCenter()};
  height: 40px;
  width: 100%;
  background: ${({ theme, selected }) => {
    if (selected) {
      if (theme.name === 'dark') {
        return theme.shade2
      }
      return theme.background
    }
    return 'transparent'
  }};
  color: ${({ theme, selected }) => {
    if (selected) {
      return theme.text
    }
    if (theme.name === 'light') {
      return theme.shade1
    }
    return theme.text
  }};
  margin: 10px 0;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.name === 'dark' ? theme.shade2 : theme.background};
    color: ${({ theme }) => theme.text};
  }
`

export default TodoSidebar
