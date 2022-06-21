/* eslint-disable no-param-reassign */

import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit'
import { fetchTodosData, updateTodosToDisk } from '../../utils/electronUtils'

import { IState, ITodosState } from '../../@types/StateInterfaces'
import {
  TodoAddActionPayload,
  TodoToggleActionPayload
} from '../../@types/TodoInterface'

const initialState: ITodosState = {
  dayData: {
    today: [],
    tomorrow: [],
    later: []
  },
  status: 'loading',
  error: null
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = fetchTodosData()
  return response
})

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoAddActionPayload>) {
      const { todo } = action.payload
      todo.id = nanoid()
      state.dayData[action.payload.day].push(todo)
      updateTodosToDisk(JSON.parse(JSON.stringify(state.dayData)))
    },
    toggleTodo(state, action: PayloadAction<TodoToggleActionPayload>) {
      const { day, todoId } = action.payload
      const todos = state.dayData[day]
      todos.map(todo => {
        if (todo.id === todoId) {
          todo.isCompleted = !todo.isCompleted
        }
        return todo
      })
      state.dayData[day] = todos
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchTodos.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.dayData = action.payload
    })
    builder.addCase(fetchTodos.rejected, state => {
      state.status = 'failed'
      state.error = 'Error fetching data from the disk. Try restarting the app.'
    })
  }
})

export default todosSlice.reducer

export const { addTodo, toggleTodo } = todosSlice.actions

export const selectTodosByDay = (
  state: IState,
  day: 'today' | 'tomorrow' | 'later'
) => state.todos.dayData[day]
