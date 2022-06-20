import { ITimeBlock } from '../@types/TimeBlockInterfaces'
import { DayStringTypes, ITimeObject } from '../@types/DayAndTimeInterfaces'

/**
 *  Get current date as a string
 *  @returns {string} The current date in form of local string
 */
export const getCurrentLocaleDateString = (): string =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  new Date().toLocaleDateString().replaceAll('/', '-')

/**
 *  Get current time as a string
 *  @returns {string} The current time in the form of local string
 */
export const getCurrentLocaleTimeString = (): string =>
  new Date().toLocaleTimeString()

/**
 * Get the current day in the form a string
 * @returns {string} A string indicating day name like `Sunday` `Saturday`
 */
export const getCurrentDayString = (): DayStringTypes => {
  const dayNum = new Date().getDay()
  switch (dayNum) {
    case 1:
      return 'monday'
    case 2:
      return 'tuesday'
    case 3:
      return 'wednesday'
    case 4:
      return 'thursday'
    case 5:
      return 'friday'
    case 6:
      return 'saturday'
    case 0:
      return 'sunday'
    default:
      return ''
  }
}

/**
 *  Generate a time string with the provided time object
 *  @param {{hours : Number, minutes : Number, pm : boolean}} timeObj
 *    An object with hours, minutes and a number `0` for a.m. or `1` for p.m.
 *  @param {boolean} hoursOnly A boolean value to indicate whether to return string
 * with only hours and a.m./p.m. or string with all hours, minutes and a.m./p.m.
 *  @returns {string} A string with time properly formatted as `HH:MM _.m.`
 */
export const getTimeString12 = (
  timeObj: ITimeObject,
  hoursOnly = false
): string => {
  // Extracting data
  const { hours } = timeObj
  const { minutes } = timeObj
  const ampm = timeObj.pm ? 'p.m.' : 'a.m.'

  let hoursString = String(hours)
  let minutesString = String(minutes)

  if (hours === 0 && !timeObj.pm) {
    hoursString = '12'
  }

  if (hoursOnly) {
    return `${hours} ${ampm}`
  }

  // String corrections
  hoursString = hours < 10 ? `0${hours}` : `${hours}`
  minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`

  return `${hoursString}:${minutesString} ${ampm}`
}

/*
    Index    <- ->  Time
    ------   <- ->  ------
    0 | 24   <- ->  12:00 a.m. - 12:59 a.m.
    1 - 11   <- ->  01:00 a.m. - 11:59 a.m.
    12       <- ->  12:00 p.m. - 12:59 p.m.
    13 - 23  <- ->  12:00 p.m. - 11:59 p.m.
*/

/** Convert time index to respective string format with a.m. or p.m.
 *  @param {number} timeIndex - The time index to be converted
 *  @returns {string} - The string corresponding to the time index provided
 */
export const convertIndexToStringHours = (timeIndex: number): string => {
  if (timeIndex === 0 || timeIndex === 24) {
    return '12 a.m.'
  }
  if (timeIndex < 12) {
    return `${timeIndex} a.m.`
  }
  if (timeIndex === 12) {
    return '12 p.m.'
  }
  if (timeIndex > 12) {
    return `${timeIndex - 12} p.m.`
  }
  return ''
}

/**
 * Calculates the difference in a time interval. Note: Calculates only within day.
 * @param {{hours : Number, minutes : Number, pm : boolean}} startTime
 *    An object with hours, minutes and a number `0` for a.m. or `1` for p.m.
 * @param {{hours : Number, minutes : Number, pm : boolean}} endTime
 *    An object with hours, minutes and a number `0` for a.m. or `1` for p.m.
 * @returns {number} Difference between the two time objects.
 *    A negative integer is returned when end time is before start time.
 */
export const getDurationMinutes = (
  startTime: ITimeObject,
  endTime: ITimeObject
): number => {
  const minutesFromDayStart = (timeObj: ITimeObject) => {
    let totalMinutes = 0
    let { hours } = timeObj
    const { minutes } = timeObj
    if (timeObj.pm) {
      totalMinutes += 12 * 60
    }
    if (timeObj.hours === 12) {
      hours = 0
    }
    totalMinutes += hours * 60
    totalMinutes += minutes
    return totalMinutes
  }

  const startDeMinutes = minutesFromDayStart(startTime)
  const endDeMinutes = minutesFromDayStart(endTime)

  return endDeMinutes - startDeMinutes
}

/**
 * Get a object with all properties regarding current time and day
 * @returns {{ hours: Number, minutes: Number, seconds: Number, pm: boolean, day: String }}
 *    Am object with all details regarding current time and current day
 */
export const getCurrentTimeAndDay = (hours24 = false): ITimeObject => {
  const currentTime = new Date()

  let hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const seconds = currentTime.getSeconds()
  const day = getCurrentDayString()
  let pm = false

  if (hours >= 12) {
    pm = true
    if (!hours24 && hours !== 12) hours -= 12
  }

  let timeObj
  if (hours24) {
    timeObj = { hours, minutes, seconds, day }
  } else {
    timeObj = { hours, minutes, seconds, pm, day }
  }

  return timeObj
}

/**
 * Checks whether the given interval is happening now or not
 * @param timeblock The Time BLock object whose interval has to checked
 * @returns {boolean} - Returns true if the interval is now, or else false
 */
export const checkCurrent = (timeblock: ITimeBlock) => {
  const currentTime = new Date()

  const startTime = new Date()
  let startHours = timeblock.startTime.hours
  const startMinutes = timeblock.startTime.minutes
  if (timeblock.startTime.pm) {
    startHours = +12
  }
  startTime.setHours(startHours, startMinutes, 0, 0)

  const endTime = new Date()
  let endHours = timeblock.endTime.hours
  const endMinutes = timeblock.endTime.minutes
  if (timeblock.endTime.pm && timeblock.endTime.hours !== 12) {
    endHours += 12
  }
  endTime.setHours(endHours, endMinutes, 0, 0)

  const currentTimeValue = currentTime.valueOf()
  const startTimeValue = startTime.valueOf()
  const endTimeValue = endTime.valueOf()

  if (startTimeValue <= currentTimeValue && endTimeValue >= currentTimeValue) {
    return true
  }
  return false
}
