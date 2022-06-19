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
      time: new Date(ts.time).toLocaleTimeString()
    })
  })

  notificationTimer = setInterval(() => {
    now = new Date()
    nowValue = now.toLocaleTimeString()
    stamps.forEach(stamp => {
      if (nowValue === stamp.time) {
        sendNotification(stamp.title, stamp.secText)
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
