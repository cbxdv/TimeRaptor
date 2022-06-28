/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { fetchTodosData, updateTodosToDisk } from '../../utils/electronUtils'

import { IState, ITodosState } from '../../@types/StateInterfaces'
import {
  ITodo,
  TodoActionPayload,
  TodoOrderUpdatePayloadAction,
  TodoUpdatePayloadAction,
  TodoDefinedListTypes,
  ITodoList,
  TodoListAddPayloadAction,
  TodoListUpdateActionPayload
} from '../../@types/TodoInterface'
import { checkIsDefinedListId, todoDayProcedures } from '../../utils/todoUtils'

const initialState: ITodosState = {
  todos: {},
  lists: {},
  definedLists: {
    today: {
      id: 'today',
      title: 'Today',
      tasks: []
    },
    tomorrow: {
      id: 'tomorrow',
      title: 'Tomorrow',
      tasks: []
    },
    later: {
      id: 'later',
      title: 'Later',
      tasks: []
    },
    starred: {
      id: 'starred',
      title: 'Starred',
      tasks: []
    },
    all: {
      id: 'all',
      title: 'All',
      tasks: []
    }
  },
  status: 'loading',
  error: null
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetchTodosData()
  const todosData = todoDayProcedures(response)
  return todosData
})

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<TodoActionPayload>) {
      const todo = action.payload
      const listIds = action.payload.lists
      todo.id = nanoid()
      listIds.forEach(listId => {
        if (listId === 'today') {
          todo.extraProps = {
            addedOnToday: new Date().valueOf()
          }
          state.definedLists.today.tasks.push(todo.id)
        } else if (listId === 'tomorrow') {
          todo.extraProps = {
            addedOnTomorrow: new Date().valueOf()
          }
          state.definedLists.tomorrow.tasks.push(todo.id)
        } else if (listId === 'later' || listId === 'starred' || listId === 'all') {
          state.definedLists[listId].tasks.push(todo.id)
        } else {
          state.lists[listId].tasks.push(todo.id)
        }
      })

      state.todos[todo.id] = todo

      const stateData: ITodosState = JSON.parse(JSON.stringify(state))
      updateTodosToDisk({
        todos: stateData.todos,
        definedLists: stateData.definedLists,
        lists: stateData.lists
      })
    },

    todoToggled(state, action: PayloadAction<string>) {
      const todoId = action.payload
      state.todos[todoId].isCompleted = !state.todos[todoId].isCompleted

      const stateData: ITodosState = JSON.parse(JSON.stringify(state))
      updateTodosToDisk({
        todos: stateData.todos,
        definedLists: stateData.definedLists,
        lists: stateData.lists
      })
    },

    todoStarredToggled(state, action: PayloadAction<string>) {
      const todoId = action.payload
      state.todos[todoId].isStarred = !state.todos[todoId].isStarred

      if (state.todos[todoId].isStarred) {
        state.definedLists.starred.tasks.push(todoId)
        state.todos[todoId].lists.push('starred')
      } else {
        state.definedLists.starred.tasks = state.definedLists.starred.tasks.filter(
          tid => tid !== todoId
        )
        state.todos[todoId].lists.filter(tlid => tlid !== 'starred')
      }

      const stateData: ITodosState = JSON.parse(JSON.stringify(state))
      updateTodosToDisk({
        todos: stateData.todos,
        definedLists: stateData.definedLists,
        lists: stateData.lists
      })
    },

    todoUpdated(state, action: PayloadAction<TodoUpdatePayloadAction>) {
      const { oldTodo, newTodo } = action.payload
      state.todos[oldTodo.id] = newTodo

      const stateData: ITodosState = JSON.parse(JSON.stringify(state))
      updateTodosToDisk({
        todos: stateData.todos,
        definedLists: stateData.definedLists,
        lists: stateData.lists
      })
    },

    todoDeleted(state, action: PayloadAction<string>) {
      const todoId = action.payload
      const { lists } = state.todos[todoId]

      lists.forEach(listId => {
        if (
          listId === 'today' ||
          listId === 'tomorrow' ||
          listId === 'later' ||
          listId === 'starred' ||
          listId === 'all'
        ) {
          let { tasks } = state.definedLists[listId as TodoDefinedListTypes]
          tasks = tasks.filter(tid => tid !== todoId)
          state.definedLists[listId as TodoDefinedListTypes].tasks = tasks
        } else {
          let { tasks } = state.lists[listId]
          tasks = tasks.filter(tid => tid !== todoId)
          state.lists[listId].tasks = tasks
        }
      })

      delete state.todos[todoId]

      const stateData: ITodosState = JSON.parse(JSON.stringify(state))
      updateTodosToDisk({
        todos: stateData.todos,
        definedLists: stateData.definedLists,
        lists: stateData.lists
      })
    },

    todosCleared(state) {
      state.todos = initialState.todos
      state.definedLists = initialState.definedLists
      state.lists = initialState.lists

      const stateData: ITodosState = JSON.parse(JSON.stringify(state))
      updateTodosToDisk({
        todos: stateData.todos,
        definedLists: stateData.definedLists,
        lists: stateData.lists
      })
    },

    todoOrderUpdated(state, action: PayloadAction<TodoOrderUpdatePayloadAction>) {
      const { sourceIndex, destinationIndex, listId, todoId } = action.payload
      if (
        listId === 'today' ||
        listId === 'tomorrow' ||
        listId === 'later' ||
        listId === 'starred' ||
        listId === 'all'
      ) {
        state.definedLists[listId as TodoDefinedListTypes].tasks.splice(sourceIndex, 1)
        state.definedLists[listId as TodoDefinedListTypes].tasks.splice(destinationIndex, 0, todoId)
      } else {
        state.lists[listId].tasks.splice(sourceIndex, 1)
        state.lists[listId].tasks.splice(destinationIndex, 0, todoId)
      }

      const stateData: ITodosState = JSON.parse(JSON.stringify(state))
      updateTodosToDisk({
        todos: stateData.todos,
        definedLists: stateData.definedLists,
        lists: stateData.lists
      })
    },

    todoListAdded(state, action: PayloadAction<TodoListAddPayloadAction>) {
      const newList: ITodoList = {
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
        tasks: []
      }
      state.lists[newList.id] = newList

      const stateData: ITodosState = JSON.parse(JSON.stringify(state))
      updateTodosToDisk({
        todos: stateData.todos,
        definedLists: stateData.definedLists,
        lists: stateData.lists
      })
    },

    todoListUpdated(state, action: PayloadAction<TodoListUpdateActionPayload>) {
      const { oldList, newList } = action.payload
      if (checkIsDefinedListId(oldList.id)) return
      state.lists[oldList.id] = newList

      const stateData: ITodosState = JSON.parse(JSON.stringify(state))
      updateTodosToDisk({
        todos: stateData.todos,
        definedLists: stateData.definedLists,
        lists: stateData.lists
      })
    },

    todoListDeleted(state, action: PayloadAction<string>) {
      const listId = action.payload
      if (checkIsDefinedListId(listId)) return
      const todos = state.lists[listId].tasks
      todos.forEach(tid => {
        const todo = state.todos[tid]
        state.definedLists.starred.tasks = state.definedLists.starred.tasks.filter(
          stid => stid !== tid
        )
        todo.lists.forEach(tlid => {
          if (checkIsDefinedListId(tlid)) {
            state.definedLists[tlid as TodoDefinedListTypes].tasks.filter(t => t !== todo.id)
          } else {
            state.lists[tlid].tasks.filter(t => t !== todo.id)
          }
        })
        delete state.todos[tid]
      })

      delete state.lists[listId]

      const stateData: ITodosState = JSON.parse(JSON.stringify(state))
      updateTodosToDisk({
        todos: stateData.todos,
        definedLists: stateData.definedLists,
        lists: stateData.lists
      })
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchTodos.pending, state => {
      // state = initialState
      state.status = 'loading'
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'succeeded'
      const todosData = action.payload
      state.definedLists = todosData.definedLists
      state.todos = todosData.todos
      state.lists = todosData.lists
    })
    builder.addCase(fetchTodos.rejected, state => {
      state.status = 'failed'
      state.error = 'Error fetching data from the disk. Try restarting the app.'
    })
  }
})

export default todosSlice.reducer

export const {
  todoAdded,
  todoToggled,
  todoStarredToggled,
  todoUpdated,
  todoDeleted,
  todosCleared,
  todoOrderUpdated,
  todoListAdded,
  todoListUpdated,
  todoListDeleted
} = todosSlice.actions

export const selectTodoById = (state: IState, todoId: string) => state.todos.todos[todoId]

export const selectTodoListById = (state: IState, listId: string) => {
  switch (listId) {
    case 'today':
      return state.todos.definedLists.today
    case 'tomorrow':
      return state.todos.definedLists.tomorrow
    case 'later':
      return state.todos.definedLists.later
    case 'starred':
      return state.todos.definedLists.starred
    case 'all':
      return state.todos.definedLists.all
    default:
      return state.todos.lists[listId]
  }
}

export const selectTodosByListId = (state: IState, listId: string) => {
  const todos: ITodo[] = []
  const todosOrder = selectTodoListById(state, listId).tasks
  todosOrder.forEach(todoId => {
    todos.push(selectTodoById(state, todoId))
  })
  return todos
}

export const selectTodoLists = (state: IState) => state.todos.lists

export const selectTodoStateStatus = (state: IState) => state.todos.status
