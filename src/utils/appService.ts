import { reloadWindow } from './electronUtils'

let appTimer: NodeJS.Timer

const appService = () => {
  appTimer = setInterval(() => {
    const currentTime = new Date().toLocaleTimeString()
    if (currentTime === '12:00:00 AM' || currentTime === '12:00:01 AM') {
      reloadWindow()
    }
  }, 1000)
}

export const startAppService = () => {
  appService()
}

export const stopAppService = () => {
  clearInterval(appTimer)
}
