import { NotificationStartPayloadAction } from '../@types/TimeBlockInterfaces'
import { ITimeStamp, ITimeStampWithStrings } from '../@types/AppInterfaces'
import { sendNotification } from './notificationUtils'

let notificationTimer: NodeJS.Timer

const notificationService = (
  timeStamps: ITimeStamp[],
  startNotification: boolean,
  endNotification: boolean
) => {
  let now: Date
  let nowValue = ''

  const stamps: ITimeStampWithStrings[] = []

  timeStamps.forEach(ts => {
    stamps.push({
      ...ts,
      time: new Date(ts.time).toLocaleTimeString()
    })
  })

  notificationTimer = setInterval(() => {
    now = new Date()
    nowValue = now.toLocaleTimeString()
    stamps.forEach(stamp => {
      if (nowValue === stamp.time) {
        if (
          (stamp.secText === 'Starts now' && startNotification) ||
          (stamp.secText === 'Ends now' && endNotification)
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
    notificationState.endNotification
  )
}

export const stopNotificationService = () => {
  clearTimeout(notificationTimer)
}
