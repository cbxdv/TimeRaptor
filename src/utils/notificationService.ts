import { ITimeStamp } from '../@types/AppInterfaces'
import { sendNotification } from './notificationUtils'

let notificationTimer: NodeJS.Timer

const notificationService = (timeStamps: ITimeStamp[]) => {
  let now: Date
  let nowValue = ''

  notificationTimer = setInterval(() => {
    now = new Date()
    nowValue = now.toLocaleTimeString()
    timeStamps.forEach(stamp => {
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
