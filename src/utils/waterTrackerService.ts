import { IWaterTrackerServiceUpdateData } from '../@types/WaterTrackerInterfaces'
import { sendNotification } from './notificationUtils'

let waterTimer: NodeJS.Timer

const waterTrackerService = (waterTrackerData: IWaterTrackerServiceUpdateData) => {
  const { alreadyCompleted, intervalValue } = waterTrackerData

  let targetTime = ''
  let currentTime = ''

  let target = new Date()
  target.setMinutes(target.getMinutes() + (intervalValue - alreadyCompleted))
  targetTime = target.toString()

  waterTimer = setInterval(() => {
    currentTime = new Date().toString()
    if (currentTime === targetTime) {
      sendNotification("It's time to hydrate", 'Fetch yourself a drink 🥛')
      target = new Date()
      target.setMinutes(target.getMinutes() + intervalValue)
      targetTime = target.toString()
    }
  }, 1000)
}

export const startWaterTrackerService = (waterTrackerData: IWaterTrackerServiceUpdateData) => {
  if (waterTrackerData.notifications) {
    waterTrackerService(waterTrackerData)
  }
}

export const stopWaterTrackerService = () => {
  clearInterval(waterTimer)
}
