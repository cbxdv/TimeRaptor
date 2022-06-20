import { NotificationStartPayloadAction } from '../@types/TimeBlockInterfaces'
import { ITimeStamp, ITimeStampWithStrings } from '../@types/AppInterfaces'
import { sendNotification } from './notificationUtils'

let notificationTimer: NodeJS.Timer

const notificationService = (
  timeStamps: ITimeStamp[],
  startNotification: boolean,
  endNotification: boolean,
  startNotificationBefore: number,
  endNotificationBefore: number
) => {
  let now: Date
  let nowValue = ''

  const stamps: ITimeStampWithStrings[] = []

  timeStamps.forEach(ts => {
    let { secText, time } = ts

    if (ts.secText.startsWith('Starts')) {
      time = ts.time - 60000 * startNotificationBefore
      if (startNotificationBefore !== 0) {
        secText = `Starts in ${startNotificationBefore} minutes`
      }
    } else {
      time = ts.time - 60000 * endNotificationBefore
      if (endNotificationBefore !== 0) {
        secText = `Ends in ${endNotificationBefore} minutes`
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
          (stamp.secText.startsWith('Starts') && startNotification) ||
          (stamp.secText.endsWith('Ends') && endNotification)
        ) {
          sendNotification(stamp.title, stamp.secText)
        }
      }
    })
  }, 1000)
}

export const startNotificationService = (
  timeStamps: ITimeStamp[],
  notificationState: NotificationStartPayloadAction
) => {
  notificationService(
    timeStamps,
    notificationState.startNotification,
    notificationState.endNotification,
    notificationState.startNotificationBefore,
    notificationState.endNotificationBefore
  )
}

export const stopNotificationService = () => {
  clearTimeout(notificationTimer)
}
