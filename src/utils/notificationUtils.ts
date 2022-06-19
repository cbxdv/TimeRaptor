import { ITimeStamp } from '../@types/AppInterfaces'
import { ITimeBlock } from '../@types/TimeBlockInterfaces'
import { getElectronContext } from './electronUtils'

export const generateTimetableTimeStamps = (
  dayData: ITimeBlock[],
  oldStamps: ITimeStamp[] = []
) => {
  const stamps: ITimeStamp[] = oldStamps

  dayData.forEach((tb: ITimeBlock) => {
    const { id, description } = tb
    let { title } = tb

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

    if (description.length !== 0) {
      title = `${title} - ${description}`
    }

    stamps.push({
      id,
      title,
      time: startTime.valueOf(),
      secText: 'Starts now'
    })

    stamps.push({
      id,
      title,
      time: endTime.valueOf(),
      secText: 'Ends now'
    })
  })

  return stamps
}

export const sendNotification = (title: string, description: string) => {
  const electron = getElectronContext()
  electron.appNotify({
    title: `${title}`,
    body: `${description}`
  })
}
