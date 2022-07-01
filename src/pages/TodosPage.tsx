import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import TodosViewer from '../components/TodosViewer'
import ConfigsPanel from '../components/ConfigsPanel'
import IconButton from '../components/IconButton'
import WithModal from '../wrappers/WithModal'
import TextInput from '../components/TextInput'
import TextArea from '../components/TextArea'
import {
  selectTodoListById,
  selectTodoLists,
  selectTodoStateStatus,
  todoListAdded,
  todoListDeleted,
  todoListUpdated
} from '../redux/slices/todosSlice'
import Loader from '../components/Loader'
import { IState } from '../@types/StateInterfaces'
import { ITodoList } from '../@types/TodoInterface'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import GearIcon from '../assets/icons/Gear.svg'
import AddBlockIcon from '../assets/icons/AddBlock.svg'
import Logo from '../assets/Logo.png'
import { flexCenter } from '../styles/styleUtils'

const TodoPage = () => {
  const location = useLocation().pathname.split('/')[2]

  const todosStateStatus = useAppSelector(selectTodoStateStatus)

  if (todosStateStatus === 'loading')
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    )
  return (
    <TodoPageContainer>
      <MainContainer>
        <TodosSidebar listId={location} />
        <TodosViewer listId={location} />
      </MainContainer>
    </TodoPageContainer>
  )
}

const TodosSidebar: React.FC<TodosSidebarProps> = ({ listId }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const enableBack = searchParams.get('enableBack')

  const [showUConfigPanel, setShowUConfigPanel] = useState<boolean>(false)
  const [showListEditorPanel, setShowListEditorPanel] = useState<boolean>(false)
  const [editingList, setEditingList] = useState<string>('')

  const todoLists = useAppSelector(selectTodoLists)

  const openListAdder = () => {
    setShowListEditorPanel(true)
    setEditingList('')
  }

  const openListEditor = (id: string) => {
    setShowListEditorPanel(true)
    setEditingList(id)
  }

  const closeEditor = () => {
    setShowListEditorPanel(false)
    setEditingList('')
  }

  const logoClickHandler = () => {
    if (enableBack === 'true') {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      {showUConfigPanel && <ConfigsPanel closeHandler={() => setShowUConfigPanel(false)} />}
      {showListEditorPanel && editingList.length === 0 && (
        <TodoListEditorPanel closeHandler={closeEditor} />
      )}
      {showListEditorPanel && editingList.length !== 0 && (
        <TodoListEditorPanel closeHandler={closeEditor} edit listId={editingList} />
      )}
      <SidebarContainer>
        <AppHeader>
          <div onClick={logoClickHandler} role='button' style={{ cursor: 'pointer' }}>
            <AppLogo src={Logo} className='header-logo' alt='Time Raptor' />
          </div>
          <h3>Todos & Tasks</h3>
        </AppHeader>
        <div>
          <Link to='/todos/today'>
            <TabLink selected={listId === 'today'}>Today</TabLink>
          </Link>
          <Link to='/todos/tomorrow'>
            <TabLink selected={listId === 'tomorrow'}>Tomorrow</TabLink>
          </Link>
          <Link to='/todos/later'>
            <TabLink selected={listId === 'later'}>Later</TabLink>
          </Link>
          <Link to='/todos/starred'>
            <TabLink selected={listId === 'starred'}>Starred</TabLink>
          </Link>
          <Link to='/todos/all'>
            <TabLink selected={listId === 'all'}>All</TabLink>
          </Link>
        </div>
        <div style={{ marginTop: '30px' }}>
          {Object.keys(todoLists).map(lid => {
            const todoList = todoLists[lid]
            return (
              <Link
                key={`link-${todoList.id}`}
                to={`/todos/${todoList.id}`}
                onAuxClick={() => openListEditor(todoList.id)}
              >
                <TabLink selected={listId === todoList.id}>{todoList.title}</TabLink>
              </Link>
            )
          })}
        </div>
        <SidebarFooter>
          <IconButton label='Add' Icon={AddBlockIcon} onClick={openListAdder} />
          <IconButton Icon={GearIcon} onClick={() => setShowUConfigPanel(!showUConfigPanel)} />
        </SidebarFooter>
      </SidebarContainer>
    </>
  )
}

type TodosSidebarProps = {
  listId?: string
}

TodosSidebar.defaultProps = {
  listId: 'today'
}

const TodoListEditorPanel: React.FC<TodoListEditorPanelProps> = ({
  closeHandler,
  edit,
  listId
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const location = useLocation().pathname.split('/')[2]

  const [listName, setListName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const [nameError, setNameError] = useState<boolean>(false)

  let todoList: ITodoList = null
  if (edit) {
    todoList = useAppSelector((state: IState) => selectTodoListById(state, listId))
  }

  useEffect(() => {
    if (edit && todoList) {
      setListName(todoList.title)
      setDescription(todoList.description)
    }
  }, [])

  const submitHandler = (close: () => void) => {
    if (listName.length === 0) {
      setNameError(true)
      setTimeout(() => {
        setNameError(false)
      }, 5000)
      return
    }
    close()
    setTimeout(() => {
      if (edit) {
        dispatch(
          todoListUpdated({
            oldList: todoList,
            newList: {
              ...todoList,
              title: listName,
              description
            }
          })
        )
      } else {
        dispatch(
          todoListAdded({
            title: listName,
            description
          })
        )
      }
    }, 150)
  }

  const deleteHandler = (close = () => {}) => {
    close()
    setTimeout(() => {
      dispatch(todoListDeleted(todoList.id))
    }, 150)
    if (location === listId) {
      navigate('/todos/today', { replace: true })
    }
  }

  return (
    <WithModal
      modalTitle={`${edit ? 'Edit' : 'Add new'} list`}
      closeHandler={closeHandler}
      bodyPadding='40px 30px 20px 30px'
      mainButtonProps={{ label: edit ? 'Edit' : 'Add', onClick: submitHandler }}
      secButtonProps={edit && { label: 'Delete', onClick: deleteHandler }}
    >
      <div style={{ marginBottom: '20px' }}>
        <TextInput
          name='listName'
          inputValue={listName}
          onChangeHandler={event => setListName(event.target.value)}
          title='List Name'
          error={nameError}
        />
      </div>
      <div style={{ marginTop: '40px', marginBottom: '30px' }}>
        <TextArea
          title='Description'
          name='description'
          inputValue={description}
          onChangeHandler={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value)
          }
        />
      </div>
    </WithModal>
  )
}

interface TodoListEditorPanelProps {
  closeHandler: () => void
  edit?: boolean
  listId?: string
}

TodoListEditorPanel.defaultProps = {
  edit: false,
  listId: ''
}

const LoaderContainer = styled.div`
  ${flexCenter()};
  height: 100vh;
  width: 100vw;
`

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
  background: ${({ theme }) => (theme.name === 'dark' ? theme.shade1 : theme.shade2)};
  height: 100%;
  overflow-y: scroll;
`

const AppHeader = styled.div`
  ${flexCenter()};
  position: sticky;
  top: 0;
  background: ${({ theme }) => (theme.name === 'dark' ? theme.shade1 : theme.shade2)};
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

  &:hover {
    background: ${({ theme, selected }) => !selected && theme.secondary};
  }
`

const SidebarFooter = styled.div`
  ${flexCenter({ justifyContent: 'space-around' })};
  padding: 20px 0;
  margin-top: auto;
  position: sticky;
  bottom: 0;
  background: ${({ theme }) => (theme.name === 'dark' ? theme.shade1 : theme.shade2)};
  width: 100%;
`

export default TodoPage
