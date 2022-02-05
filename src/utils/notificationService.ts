import { ITimeStamp, ITimeStampWithStrings } from '../@types/AppInterfaces'
import { sendNotification } from './notificationUtils'

let notificationTimer: NodeJS.Timer

const notificationService = (timeStamps: ITimeStamp[]) => {
  let now: Date
  let nowValue = ''

  const stamps: ITimeStampWithStrings[] = []

  timeStamps.forEach(ts => {
    stamps.push({
      ...ts,
      startTime: new Date(ts.startTime).toLocaleTimeString(),
      endTime: new Date(ts.endTime).toLocaleTimeString()
    })
  })

  notificationTimer = setInterval(() => {
    now = new Date()
    nowValue = now.toLocaleTimeString()
    stamps.forEach(stamp => {
      if (nowValue === stamp.startTime) {
        sendNotification(stamp.title, stamp.description)
      }
    })
  }, 1000)
}

export const startNotificationService = (timeStamps: ITimeStamp[]) => {
  notificationService(timeStamps)
}

export const stopNotificationService = () => {
  clearTimeout(notificationTimer)
}
