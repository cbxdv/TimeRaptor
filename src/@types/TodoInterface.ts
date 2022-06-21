interface ITodoBase {
  title: string
  isCompleted: boolean
}

export interface ITodo extends ITodoBase {
  readonly id: string
}

interface ITodoActionPayload extends ITodoBase {
  id: string
}

export type TodoDayTypes = 'today' | 'tomorrow' | 'later'

export type ITodoDayData = {
  [key in TodoDayTypes]: ITodo[]
} & {
  today: ITodo[]
  tomorrow: ITodo[]
  later: ITodo[]
}

export interface TodoAddActionPayload {
  day: TodoDayTypes
  todo: ITodoActionPayload
}

export interface TodoToggleActionPayload {
  day: TodoDayTypes
  todoId: string
}
