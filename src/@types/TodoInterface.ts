interface ITodoBase {
  title: string
  isCompleted: boolean
  description: string
  remainder?: number
  lists: string[]
  isStarred: boolean
  extraProps?: {
    addedOnTomorrow?: number
    addedOnToday?: number
  }
}

export interface ITodo extends ITodoBase {
  readonly id: string
}

interface ITodoListBase {
  title: string
  description?: string
  tasks: string[]
}

export interface ITodoList extends ITodoListBase {
  readonly id: string
}

export type TodoDefinedListTypes =
  | 'today'
  | 'tomorrow'
  | 'later'
  | 'starred'
  | 'all'

export type ITodoDefinedList = {
  [key in TodoDefinedListTypes]: ITodoList
} & {
  today: ITodoList
  tomorrow: ITodoList
  later: ITodoList
  starred: ITodoList
  all: ITodoList
}

export interface ITodosData {
  todos: {
    [key: string]: ITodo
  }
  lists: {
    [key: string]: ITodoList
  }
  definedLists: ITodoDefinedList
}

export interface TodoActionPayload extends ITodoBase {
  id: string
}

export interface TodoUpdatePayloadAction {
  oldTodo: TodoActionPayload
  newTodo: TodoActionPayload
}

export interface TodoOrderUpdatePayloadAction {
  sourceIndex: number
  destinationIndex: number
  listId: string
  todoId: string
}

export interface TodoListAddPayloadAction {
  title: string
  description: string
}

export interface TodoListUpdateActionPayload {
  oldList: ITodoList
  newList: ITodoList
}
