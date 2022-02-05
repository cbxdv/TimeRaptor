/* eslint-disable no-param-reassign */

import {
  createSlice,
  createAsyncThunk,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit'

import { ITodoPayloadAction, ITodo } from '../../@types/TodoInterfaces'
import { ITodosState, IState } from '../../@types/StateInterfaces'
import { fetchTodoData, saveTodosToDisk } from '../../utils/electronUtils'

const initialState: ITodosState = {
  todosData: [],
  status: 'loading',
  error: ''
}

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const response = await fetchTodoData()
  return response
})

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoToggled(state, action: PayloadAction<ITodo>) {
      state.todosData = state.todosData.map(todo => {
        if (todo.id === action.payload.id) {
          todo.isCompleted = !todo.isCompleted
        }
        return todo
      })
      saveTodosToDisk(JSON.parse(JSON.stringify(state.todosData)))
    },
    todoAdded(
      state,
      action: PayloadAction<{ title: string; category: string }>
    ) {
      if (action.payload) {
        const todo: ITodoPayloadAction = {
          id: nanoid(),
          title: action.payload.title,
          category: action.payload.category,
          isCompleted: false
        }
        state.todosData.push(todo)
        saveTodosToDisk(JSON.parse(JSON.stringify(state.todosData)))
      }
    },
    todoDeleted(state, action: PayloadAction<ITodo>) {
      const { id } = action.payload
      state.todosData = state.todosData.filter((todo: ITodo) => todo.id !== id)
      saveTodosToDisk(JSON.parse(JSON.stringify(state.todosData)))
    },
    todosCleared(state) {
      state.todosData = []
      saveTodosToDisk([])
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'idle'
        state.todosData = action.payload
      })
      .addCase(fetchTodos.rejected, state => {
        state.status = 'error'
        state.error = 'Error fetching data from disk'
      })
  }
})

export default todosSlice.reducer

export const { todoToggled, todoAdded, todoDeleted, todosCleared } =
  todosSlice.actions

// Selectors
export const selectTodos = (state: IState) => state.todos.todosData
