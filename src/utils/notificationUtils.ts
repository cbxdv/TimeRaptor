import { ITimeStamp } from '../@types/AppInterfaces'
import { ITimeBlock } from '../@types/TimeBlockInterfaces'
import { getElectronContext } from './electronUtils'

export const generateTimeStamps = (
  dayData: ITimeBlock[],
  oldStamps: ITimeStamp[] = []
) => {
  const stamps: ITimeStamp[] = oldStamps

  dayData.forEach((tb: ITimeBlock) => {
    const { id, title, description } = tb

    const startTime = new Date()
    let startHours = tb.startTime.hours
    const startMinutes = tb.startTime.minutes
    const startPM = tb.startTime.pm
    if (startPM === true && startHours !== 12) {
      startHours += 12
    }
    if (startPM === false && startHours === 12) {
      startHours = 0
    }
    startTime.setHours(startHours, startMinutes, 0, 0)

    const endTime = new Date()
    let endHours = tb.endTime.hours
    const endMinutes = tb.endTime.minutes
    const endPM = tb.endTime.pm
    if (endPM === true && endHours !== 12) {
      endHours += 12
    }
    if (endPM === false && endHours === 12) {
      endHours = 0
    }
    endTime.setHours(endHours, endMinutes, 0, 0)

    stamps.push({
      id,
      title,
      startTime: startTime.valueOf(),
      endTime: endTime.valueOf(),
      description
    })
  })
  return stamps
}

export const sendNotification = (title: string, description: string) => {
  const electron = getElectronContext()
  electron.appNotify({
    title: `${title} starts now`,
    body: `${description}`
  })
}
