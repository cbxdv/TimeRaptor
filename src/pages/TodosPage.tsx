import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import Logo from '../assets/Logo.png'
import { flexCenter } from '../styles/styleUtils'
import TodosViewer from '../components/TodosViewer'
import { TodoDayTypes } from '../@types/TodoInterface'

const TodoPage = () => {
  const location = useLocation().pathname.split('/')[2] as TodoDayTypes
  return (
    <TodoPageContainer>
      <MainContainer>
        <TodosSidebar listName={location} />
        <TodosViewer listName={location} />
      </MainContainer>
    </TodoPageContainer>
  )
}

const TodosSidebar: React.FC<TodosSidebarProps> = ({ listName }) => (
  <SidebarContainer>
    <AppHeader>
      <Link to='/'>
        <div role='button' style={{ cursor: 'pointer' }}>
          <AppLogo src={Logo} className='header-logo' alt='Time Raptor' />
        </div>
      </Link>
      <h3>Todos & Tasks</h3>
    </AppHeader>
    <div>
      <Link to='/todos/today'>
        <TabLink selected={listName === 'today'}>Today</TabLink>
      </Link>
      <Link to='/todos/tomorrow'>
        <TabLink selected={listName === 'tomorrow'}>Tomorrow</TabLink>
      </Link>
      <Link to='/todos/later'>
        <TabLink selected={listName === 'later'}>Later</TabLink>
      </Link>
    </div>
    <div style={{ marginTop: '30px' }}></div>
  </SidebarContainer>
)

type TodosSidebarProps = {
  listName?: TodoDayTypes
}

TodosSidebar.defaultProps = {
  listName: 'today'
}

const TodoPageContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  height: 100vh;
`

const MainContainer = styled.main`
  height: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  position: relative;
  height: 100%;
`

const SidebarContainer = styled.div`
  ${flexCenter({ flexDirection: 'column', justifyContent: 'flex-start' })};
  background: ${({ theme }) =>
    theme.name === 'dark' ? theme.shade1 : theme.shade2};
  height: 100%;
  overflow-y: scroll;
`

const AppHeader = styled.div`
  ${flexCenter()};
  position: sticky;
  top: 0;
  background: ${({ theme }) =>
    theme.name === 'dark' ? theme.shade1 : theme.shade2};
  width: 100%;
  padding: 20px 0;
`

const AppLogo = styled.img`
  width: 45px;
  margin-right: 20px;
`

const TabLink = styled.div<{ selected?: boolean }>`
  ${flexCenter()};
  height: 48px;
  width: 250px;
  background: ${({ theme, selected }) => selected && theme.accent};
  color: ${({ theme, selected }) =>
    selected && theme.name === 'light' ? theme.background : theme.text};
  cursor: pointer;
  margin: 10px 0;
`

export default TodoPage
