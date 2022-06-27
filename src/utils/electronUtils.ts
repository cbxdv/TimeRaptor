import { ITodosData } from '../@types/TodoInterface'
import { ITimetableDayData } from '../@types/TimetableInterfaces'
import { INotificationStates } from '../@types/AppInterfaces'
import { IConfigs } from '../@types/UserConfigInterfaces'
import { IDayPlannerData } from '../@types/DayPlannerInterfaces'

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

export const saveConfigToDisk = (configName: string, configValue: unknown) => {
  const electronContext = getElectronContext()
  electronContext.setUserConfig({ configName, configValue })
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

export const openRepo = () => {
  const electron = getElectronContext()
  electron.appOpenRepoLink()
}

export const quitApp = () => {
  const electron = getElectronContext()
  electron.quitApp()
}

export const fetchTimetableData = async () => {
  const initialData: ITimetableDayData = {
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

export const saveBlocksToDisk = (dayData: ITimetableDayData) => {
  const electronContext = getElectronContext()
  electronContext.updateTimeBlocks(dayData)
}

export const fetchTodosData = async () => {
  const electron = getElectronContext()
  const response = await electron.getAllTodos()
  const initialData: ITodosData = {
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
    }
  }
  const todosData: ITodosData = {
    ...initialData,
    ...response
  }
  return todosData
}

export const updateTodosToDisk = (todosData: ITodosData) => {
  const electronContext = getElectronContext()
  electronContext.updateTodos(todosData)
}

export const fetchConfigsData = async () => {
  const electron = getElectronContext()
  const response: IConfigs = await electron.getUserConfigs()
  const initialState: IConfigs = {
    timetableConfigs: {
      daysToShow: {
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true
      },
      startNotifications: true,
      endNotifications: true,
      startNotificationsBefore: 0,
      endNotificationsBefore: 0,
      showCurrentTime: true,
      showCurrentBlock: true
    },
    todoConfigs: {
      notifications: true,
      dayProcedures: true
    },
    dayPlannerConfigs: {
      showCurrentTime: true,
      dayProcedures: true,
      startNotifications: true,
      endNotifications: true,
      startNotificationsBefore: 0,
      endNotificationsBefore: 0
    },
    appConfigs: {
      closeOnExit: false,
      darkMode: true,
      openMinimized: false
    }
  }
  const data: IConfigs = {
    ...initialState,
    ...response,
    timetableConfigs: {
      ...initialState.timetableConfigs,
      ...response.timetableConfigs
    },
    todoConfigs: {
      ...initialState.todoConfigs,
      ...response.todoConfigs
    },
    dayPlannerConfigs: {
      ...initialState.dayPlannerConfigs,
      ...response.dayPlannerConfigs
    },
    appConfigs: {
      ...initialState.appConfigs,
      ...response.appConfigs
    }
  }
  return data
}

export const fetchDayPlannerDataFromDisk = async () => {
  const electron = getElectronContext()
  const response: IDayPlannerData = await electron.getAllDayPlannerBlocks()
  const initialState: IDayPlannerData = {
    lastUpdated: 0,
    dayData: {
      currentDay: [],
      nextDay: []
    }
  }
  const data: IDayPlannerData = {
    ...initialState,
    ...response
  }
  return data
}

export const updateDayPlannerDataToDisk = (dayPlannerData: IDayPlannerData) => {
  const electron = getElectronContext()
  electron.updateDayPlannerBlocks(dayPlannerData)
}

export const fetchNotificationStates = async () => {
  const configsData = await fetchConfigsData()
  const notificationStates: INotificationStates = {
    startTimetableNotifications:
      configsData.timetableConfigs.startNotifications,
    endTimetableNotifications: configsData.timetableConfigs.endNotifications,
    startTimetableNotificationsBefore:
      configsData.timetableConfigs.startNotificationsBefore,
    endTimetableNotificationsBefore:
      configsData.timetableConfigs.endNotificationsBefore,
    todoNotifications: configsData.todoConfigs.notifications,
    startDayPlannerNotifications:
      configsData.dayPlannerConfigs.startNotifications,
    endDayPlannerNotifications: configsData.dayPlannerConfigs.endNotifications,
    startDayPlannerNotificationsBefore:
      configsData.dayPlannerConfigs.startNotificationsBefore,
    endDayPlannerNotificationsBefore:
      configsData.dayPlannerConfigs.endNotificationsBefore
  }
  return notificationStates
}
