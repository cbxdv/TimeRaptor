import { ITodosData } from '../@types/TodoInterface'
import { fetchConfigsData, updateTodosToDisk } from './electronUtils'
import { checkWhetherYesterday } from './timeUtils'

export const todoDayProcedures = async (todosData: ITodosData) => {
  const configs = await fetchConfigsData()
  if (configs && configs.todoConfigs) {
    if (!configs.todoConfigs.dayProcedures) return todosData
  }

  const newTodos = { ...todosData.todos }
  const todayTodos = [...todosData.definedLists.today.tasks]
  const tomorrowTodos = [...todosData.definedLists.tomorrow.tasks]
  let starredTodos = [...todosData.definedLists.starred.tasks]
  let allListTodos = [...todosData.definedLists.all.tasks]

  const newTodayTodos: string[] = []
  const newTomorrowTodos: string[] = []

  todayTodos.forEach(todoId => {
    const todo = todosData.todos[todoId]
    if (
      todo.extraProps &&
      todo.extraProps.addedOnToday &&
      checkWhetherYesterday(todo.extraProps.addedOnToday)
    ) {
      if (todo.isRecurringEveryday) {
        const newTodo = { ...todo }
        newTodo.extraProps = {
          addedOnToday: new Date().valueOf()
        }
        newTodo.isCompleted = false
        newTodos[newTodo.id] = newTodo
        newTodayTodos.push(todo.id)
      } else if (todo.isCompleted) {
        if (todo.isStarred) {
          starredTodos = starredTodos.filter(tid => tid !== todo.id)
        }
        allListTodos = allListTodos.filter(tid => tid !== todo.id)
        delete newTodos[todo.id]
      } else {
        newTodayTodos.push(todo.id)
      }
    } else {
      newTodayTodos.push(todo.id)
    }
  })
  tomorrowTodos.forEach(todoId => {
    const todo = todosData.todos[todoId]
    if (
      todo.extraProps &&
      todo.extraProps.addedOnTomorrow &&
      checkWhetherYesterday(todo.extraProps.addedOnTomorrow)
    ) {
      if (todo.isCompleted) {
        if (todo.isStarred) {
          starredTodos = starredTodos.filter(tid => tid !== todo.id)
        }
        allListTodos = allListTodos.filter(tid => tid !== todo.id)
        delete newTodos[todo.id]
      } else {
        const newTodo = { ...todo }
        newTodo.extraProps = {
          addedOnToday: new Date().valueOf()
        }
        newTodo.lists = [...newTodo.lists]
        newTodo.lists = newTodo.lists.filter(todoList => todoList !== 'tomorrow')
        newTodo.lists.push('today')
        newTodayTodos.push(newTodo.id)
        newTodos[newTodo.id] = newTodo
      }
    } else {
      newTomorrowTodos.push(todo.id)
    }
  })

  const newTodosData: ITodosData = {
    ...todosData,
    todos: newTodos,
    definedLists: {
      ...todosData.definedLists,
      today: {
        ...todosData.definedLists.today,
        tasks: newTodayTodos
      },
      tomorrow: {
        ...todosData.definedLists.tomorrow,
        tasks: newTomorrowTodos
      },
      starred: {
        ...todosData.definedLists.starred,
        tasks: starredTodos
      },
      all: {
        ...todosData.definedLists.all,
        tasks: allListTodos
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
