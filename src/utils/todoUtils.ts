import { ITodosData } from '../@types/TodoInterface'
import { fetchConfigsData, updateTodosToDisk } from './electronUtils'
import { checkWhetherYesterday } from './timeUtils'

// eslint-disable-next-line import/prefer-default-export
export const todoDayProcedures = async (todosData: ITodosData) => {
  const configs = await fetchConfigsData()
  if (configs && configs.todoConfigs) {
    if (!configs.todoConfigs.dayProcedures) return todosData
  }

  const newTodos = { ...todosData.todos }
  const todayTodos = [...todosData.definedLists.today.tasks]
  const tomorrowTodos = [...todosData.definedLists.tomorrow.tasks]
  tomorrowTodos.forEach((todoId, index: number) => {
    const todo = todosData.todos[todoId]
    if (
      todo.extraProps &&
      todo.extraProps.addedOnTomorrow &&
      checkWhetherYesterday(todo.extraProps.addedOnTomorrow)
    ) {
      const newTodo = { ...todo }
      newTodo.extraProps = {
        addedOnToday: new Date().valueOf()
      }
      newTodo.lists = [...newTodo.lists]
      newTodo.lists = newTodo.lists.filter(todoList => todoList !== 'tomorrow')
      newTodo.lists.push('today')
      todayTodos.push(todo.id)
      tomorrowTodos.splice(index, 1)
      newTodos[newTodo.id] = newTodo
    }
  })

  const newTodosData: ITodosData = {
    ...todosData,
    todos: {
      ...todosData.todos,
      ...newTodos
    },
    definedLists: {
      ...todosData.definedLists,
      today: {
        ...todosData.definedLists.today,
        tasks: todayTodos
      },
      tomorrow: {
        ...todosData.definedLists.tomorrow,
        tasks: tomorrowTodos
      }
    }
  }
  updateTodosToDisk(newTodosData)
  return newTodosData
}

export const checkIsDefinedListId = (listId: string) =>
  listId === 'today' ||
  listId === 'tomorrow' ||
  listId === 'later' ||
  listId === 'starred' ||
  listId === 'all'
