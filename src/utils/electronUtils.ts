import { ITodo } from '../@types/TodoInterfaces'
import { IDayData } from '../@types/TimetableInterfaces'

/**
 * Extracts and returns the electron context object defined at window.
 * If nothing found, then an error is thrown with a message.
 * @returns Electron Context Object
 */
export const getElectronContext = () => {
  try {
    // eslint-disable-next-line
    // @ts-ignore
    const electronContext = window.electron
    if (!electronContext) {
      throw new Error()
    }
    return electronContext
  } catch {
    // eslint-disable-next-line no-console
    console.log('Error connecting to context. Try restarting app.')
  }
  return null
}

export const fetchTimetableData = async () => {
  const initialData: IDayData = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  }
  const electron = getElectronContext()
  const response = await electron.getAllTimeBlocks()
  if (!response) {
    return initialData
  }
  if (Object.keys(response).length !== 7) {
    return {
      ...initialData,
      ...response
    }
  }
  return response
}

export const fetchTodoData = async () => {
  const data: ITodo[] = []
  const electron = getElectronContext()
  const response = await electron.getAllTodos()
  if (!response) {
    return data
  }
  return response
}

export const saveBlocksToDisk = (dayData: IDayData) => {
  const electronContext = getElectronContext()
  electronContext.updateTimeBlocks(dayData)
}

export const saveConfigToDisk = (configName: string, configValue: unknown) => {
  const electronContext = getElectronContext()
  electronContext.setUserConfig({ configName, configValue })
}

export const saveTodosToDisk = (todos: ITodo[]) => {
  const electronContext = getElectronContext()
  electronContext.updateTodos(todos)
}

export const closeWindow = () => {
  const electronContext = getElectronContext()
  electronContext.closeWindow()
}

export const maximizeWindow = () => {
  const electronContext = getElectronContext()
  electronContext.maximizeWindow()
}

export const minimizeWindow = () => {
  const electronContext = getElectronContext()
  electronContext.minimizeWindow()
}

export const restoreWindow = () => {
  const electronContext = getElectronContext()
  electronContext.restoreWindow()
}

export const reloadWindow = () => {
  const electronContext = getElectronContext()
  electronContext.reloadWindow()
}
