interface ITodoBase {
  title: string
  isCompleted: boolean
  category: string
}

export interface ITodo extends ITodoBase {
  readonly id: string
}

export interface ITodoPayloadAction extends ITodoBase {
  id: string
}
