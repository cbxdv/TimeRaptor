import { ITodo } from '../@types/TodoInterface'
import { ITimeStamp } from '../@types/AppInterfaces'
import { ITimeBlock } from '../@types/TimeBlockInterfaces'
import { getElectronContext } from './electronUtils'
import { IDayPlannerBlock } from '../@types/DayPlannerInterfaces'

export const generateTimetableTimeStamps = (
  dayData: ITimeBlock[],
  oldStamps: ITimeStamp[] = []
) => {
  const stamps: ITimeStamp[] = oldStamps

  dayData.forEach((tb: ITimeBlock) => {
    const { id, description } = tb
    let { title } = tb

    const startTime = new Date()
    let startHours = tb.startTime.hours
    const startMinutes = tb.startTime.minutes
    const startPM = tb.startTime.pm

    if (startPM === true && startHours !== 12) {
      startHours += 12
    }
    if (startPM === false && startHours === 12) {
      startHours = 0
    }

    startTime.setHours(startHours, startMinutes, 0, 0)

    const endTime = new Date()
    let endHours = tb.endTime.hours
    const endMinutes = tb.endTime.minutes
    const endPM = tb.endTime.pm

    if (endPM === true && endHours !== 12) {
      endHours += 12
    }
    if (endPM === false && endHours === 12) {
      endHours = 0
    }

    endTime.setHours(endHours, endMinutes, 0, 0)

    if (description.length !== 0) {
      title = `${title} - ${description}`
    }

    const now = new Date()

    // Starting todo
    if (startTime.valueOf() > now.valueOf()) {
      stamps.push({
        id,
        title,
        time: startTime.valueOf(),
        secText: 'Starts now',
        type: 'timetable'
      })
    }

    // Ending todo
    if (endTime.valueOf() > now.valueOf()) {
      stamps.push({
        id,
        title,
        time: endTime.valueOf(),
        secText: 'Ends now',
        type: 'timetable'
      })
    }
  })

  return stamps
}

export const generateTodoTimeStamps = (
  todos: { [key: string]: ITodo },
  oldStamps: ITimeStamp[] = []
) => {
  const stamps: ITimeStamp[] = oldStamps
  const now = new Date()
  Object.keys(todos).forEach(todoId => {
    const todo: ITodo = todos[todoId]
    if (todo.remainder && !todo.isCompleted && todo.remainder > now.valueOf()) {
      stamps.push({
        id: todo.id,
        title: todo.title,
        secText: todo.description || "Time's up",
        time: todo.remainder,
        type: 'todo'
      })
    }
  })
  return stamps
}

export const generateDayPlannerTimeStamps = (
  dayData: IDayPlannerBlock[],
  oldStamps: ITimeStamp[] = []
) => {
  const stamps: ITimeStamp[] = oldStamps

  dayData.forEach((tb: IDayPlannerBlock) => {
    const { id, description } = tb
    let { title } = tb

    const startTime = new Date()
    let startHours = tb.startTime.hours
    const startMinutes = tb.startTime.minutes
    const startPM = tb.startTime.pm

    if (startPM === true && startHours !== 12) {
      startHours += 12
    }
    if (startPM === false && startHours === 12) {
      startHours = 0
    }

    startTime.setHours(startHours, startMinutes, 0, 0)

    const endTime = new Date()
    let endHours = tb.endTime.hours
    const endMinutes = tb.endTime.minutes
    const endPM = tb.endTime.pm

    if (endPM === true && endHours !== 12) {
      endHours += 12
    }
    if (endPM === false && endHours === 12) {
      endHours = 0
    }

    endTime.setHours(endHours, endMinutes, 0, 0)

    if (description.length !== 0) {
      title = `${title} - ${description}`
    }

    const now = new Date()

    // Starting todo
    if (startTime.valueOf() > now.valueOf()) {
      stamps.push({
        id,
        title,
        time: startTime.valueOf(),
        secText: 'Starts now',
        type: 'dayPlanner'
      })
    }

    // Ending todo
    if (endTime.valueOf() > now.valueOf()) {
      stamps.push({
        id,
        title,
        time: endTime.valueOf(),
        secText: 'Ends now',
        type: 'dayPlanner'
      })
    }
  })

  return stamps
}

export const sendNotification = (title: string, description: string) => {
  const electron = getElectronContext()
  electron.appNotify({
    title: `${title}`,
    body: `${description}`
  })
}
