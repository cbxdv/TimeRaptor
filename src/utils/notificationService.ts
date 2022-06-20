import { NotificationStartPayloadAction } from '../@types/TimeBlockInterfaces'
import { ITimeStamp, ITimeStampWithStrings } from '../@types/AppInterfaces'
import { sendNotification } from './notificationUtils'

let notificationTimer: NodeJS.Timer

const notificationService = (
  timeStamps: ITimeStamp[],
  startNotifications: boolean,
  endNotifications: boolean,
  startNotificationsBefore: number,
  endNotificationsBefore: number
) => {
  let now: Date
  let nowValue = ''

  const stamps: ITimeStampWithStrings[] = []

  timeStamps.forEach(ts => {
    let { secText, time } = ts

    if (ts.secText.startsWith('Starts')) {
      time = ts.time - 60000 * startNotificationsBefore
      if (startNotificationsBefore !== 0) {
        secText = `Starts in ${startNotificationsBefore} minutes`
      }
    } else {
      time = ts.time - 60000 * endNotificationsBefore
      if (endNotificationsBefore !== 0) {
        secText = `Ends in ${endNotificationsBefore} minutes`
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
        if (
          (stamp.secText.startsWith('Starts') && startNotifications) ||
          (stamp.secText.endsWith('Ends') && endNotifications)
        ) {
          sendNotification(stamp.title, stamp.secText)
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
    notificationState.startNotifications,
    notificationState.endNotifications,
    notificationState.startNotificationsBefore,
    notificationState.endNotificationsBefore
  )
}

export const stopNotificationService = () => {
  clearTimeout(notificationTimer)
}
