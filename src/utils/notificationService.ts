import {
  ITimeStamp,
  ITimeStampWithStrings,
  NotificationStartPayloadAction
} from '../@types/AppInterfaces'
import { sendNotification } from './notificationUtils'

let notificationTimer: NodeJS.Timer

const notificationService = (
  timeStamps: ITimeStamp[],
  startTimetableNotifications: boolean,
  endTimetableNotifications: boolean,
  startTimetableNotificationsBefore: number,
  endTimetableNotificationsBefore: number,
  todoNotifications: boolean
) => {
  let now: Date
  let nowValue = ''

  const stamps: ITimeStampWithStrings[] = []

  timeStamps.forEach(ts => {
    let { secText, time } = ts

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
        }
      }
    })
  }, 1000)
}

export const startNotificationsService = (
  timeStamps: ITimeStamp[],
  notificationState: NotificationStartPayloadAction
) => {
  notificationService(
    timeStamps,
    notificationState.startTimetableNotifications,
    notificationState.endTimetableNotifications,
    notificationState.startTimetableNotificationsBefore,
    notificationState.endTimetableNotificationsBefore,
    notificationState.todoNotifications
  )
}

export const stopNotificationService = () => {
  clearTimeout(notificationTimer)
}
