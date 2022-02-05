import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import TodoList from '../components/TodoList'
import Sidebar from '../components/TodoSidebar'
import { flexCenter } from '../styles/styleUtils'

const TodoPage = () => {
  const params = useParams()
  const listId = params.listId || 'today'
  return (
    <MainPageContainer>
      <Sidebar listId={listId} />
      <MainContainer>
        <TodoList listId={listId} />
      </MainContainer>
    </MainPageContainer>
  )
}

const MainPageContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`

const MainContainer = styled.main`
  ${flexCenter({ flexDirection: 'column' })};
  width: calc(100% - 250px);
  height: 100vh;
  position: relative;
  padding: 60px 0 30px 0;
  margin-left: 250px;
`

export default TodoPage
