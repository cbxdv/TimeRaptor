import {
  ITimeStamp,
  ITimeStampWithStrings,
  INotificationStates
} from '../@types/AppInterfaces'
import { sendNotification } from './notificationUtils'

let notificationTimer: NodeJS.Timer

const notificationService = (
  timeStamps: ITimeStamp[],
  notificationStates: INotificationStates
) => {
  let now: Date
  let nowValue = ''

  const {
    startTimetableNotifications,
    endTimetableNotifications,
    startTimetableNotificationsBefore,
    endTimetableNotificationsBefore,
    todoNotifications,
    startDayPlannerNotifications,
    endDayPlannerNotifications,
    startDayPlannerNotificationsBefore,
    endDayPlannerNotificationsBefore
  } = notificationStates

  const stamps: ITimeStampWithStrings[] = []

  timeStamps.forEach(ts => {
    let { secText, time } = ts

    if (ts.type === 'timetable') {
      if (ts.secText.startsWith('Starts')) {
        time = ts.time - 60000 * startTimetableNotificationsBefore
        if (startTimetableNotificationsBefore !== 0) {
          secText = `Starts in ${startTimetableNotificationsBefore} minutes`
        }
      } else {
        time = ts.time - 60000 * endTimetableNotificationsBefore
        if (endTimetableNotificationsBefore !== 0) {
          secText = `Ends in ${endTimetableNotificationsBefore} minutes`
        }
      }
    } else if (ts.type === 'dayPlanner') {
      if (ts.secText.startsWith('Starts')) {
        time = ts.time - 60000 * startDayPlannerNotificationsBefore
        if (startDayPlannerNotificationsBefore !== 0) {
          secText = `Starts in ${startDayPlannerNotificationsBefore} minutes`
        }
      } else {
        time = ts.time - 60000 * endDayPlannerNotificationsBefore
        if (endDayPlannerNotificationsBefore !== 0) {
          secText = `Ends in ${endDayPlannerNotificationsBefore} minutes`
        }
      }
    }

    stamps.push({
      ...ts,
      time: new Date(time).toLocaleTimeString(),
      secText
    })
  })

  notificationTimer = setInterval(() => {
    now = new Date()
    nowValue = now.toLocaleTimeString()
    stamps.forEach(stamp => {
      if (nowValue === stamp.time) {
        if (stamp.type === 'timetable') {
          if (
            (stamp.secText.startsWith('Starts') &&
              startTimetableNotifications) ||
            (stamp.secText.endsWith('Ends') && endTimetableNotifications)
          ) {
            sendNotification(stamp.title, stamp.secText)
          }
        } else if (stamp.type === 'todo') {
          if (todoNotifications) {
            sendNotification(stamp.title, stamp.secText)
          }
        } else if (stamp.type === 'dayPlanner') {
          if (
            (stamp.secText.startsWith('Starts') &&
              startDayPlannerNotifications) ||
            (stamp.secText.startsWith('Ends') && endDayPlannerNotifications)
          ) {
            sendNotification(stamp.title, stamp.secText)
          }
        }
      }
    })
  }, 1000)
}

export const startNotificationsService = (
  timeStamps: ITimeStamp[],
  notificationState: INotificationStates
) => {
  notificationService(timeStamps, notificationState)
}

export const stopNotificationService = () => {
  clearTimeout(notificationTimer)
}
