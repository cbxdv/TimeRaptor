/**
 *  Get current date as a string
 *  @returns {String} The current date in form of local string
 */
export const getCurrentDate = () => {
  return new Date().toLocaleDateString().replaceAll('/', '-');
};

/**
 *  Get current time as a string
 *  @returns {String} The current time in the form of local string
 */
export const getCurrentTime = () => {
  return new Date().toLocaleTimeString();
};

/**
 * Get the current day in the form a string
 * @returns {String} A string indicating day name like `Sunday` `Saturday`
 */
export const getCurrentDay = () => {
  let dayNum = new Date().getDay();
  switch (dayNum) {
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    case 0:
      return 'Sunday';
    default:
      return '';
  }
};

/**
 *  Generate a time string with the provided time object
 *  @param {{hours : Number, minutes : Number, pm : boolean}} timeObj - An object with hours, minutes and a number `0` for a.m. or `1` for p.m.
 *  @param {boolean} hoursOnly - A boolean value to indicate whether to return string with only hours and a.m./p.m. or string with all hours, minutes and a.m./p.m.
 *  @returns {String} A string with time properly formatted as `HH:MM _.m.`
 */
export const getTimeString = (timeObj, hoursOnly = false) => {
  // Extracting data
  const hours = timeObj.hours;
  const minutes = timeObj.minutes;
  const ampm = timeObj.pm ? 'p.m.' : 'a.m.';

  let hoursString = String(hours);
  let minutesString = String(minutes);

  if (hours === 0 && !timeObj.pm) {
    hoursString = `12`;
  }

  if (hoursOnly) {
    return `${hours} ${ampm}`;
  }

  // String corrections
  hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${hoursString}:${minutesString} ${ampm}`;
};

/*
    Index    <- ->  Time
    ------   <- ->  ------
    0 | 24   <- ->  12:00 a.m. - 12:59 a.m.
    1 - 11   <- ->  01:00 a.m. - 11:59 a.m.
    12       <- ->  12:00 p.m. - 12:59 p.m.
    13 - 23  <- ->  12:00 p.m. - 11:59 p.m.
*/

/** Convert time index to respective string format with a.m. or p.m.
 *  @param {Number} timeIndex - The time index to be converted
 *  @returns {String} - The string corresponding to the time index provided
 */
export const convertIndexToStringHours = (timeIndex) => {
  if (timeIndex === 0 || timeIndex === 24) {
    return `12 a.m.`;
  } else if (timeIndex < 12) {
    return `${timeIndex} a.m.`;
  } else if (timeIndex === 12) {
    return `12 p.m.`;
  } else if (timeIndex > 12) {
    return `${timeIndex - 12} p.m.`;
  }
};

/**
 * Calculates the difference in a time interval. Note: Calculates only within day.
 * @param {{hours : Number, minutes : Number, pm : boolean}} startTime -  An object with hours, minutes and a number `0` for a.m. or `1` for p.m.
 * @param {{hours : Number, minutes : Number, pm : boolean}} endTime -  An object with hours, minutes and a number `0` for a.m. or `1` for p.m.
 * @returns {minutes} Difference between the two time objects. A negative integer is returned when end time is before start time.
 */
export const getDurationMinutes = (startTime, endTime) => {
  const minutesFromDayStart = (timeObj) => {
    let totalMinutes = 0;
    let hours = timeObj.hours;
    let minutes = timeObj.minutes;
    if (timeObj.pm) {
      totalMinutes += 12 * 60;
    }
    if (timeObj.hours === 12) {
      hours = 0;
    }
    totalMinutes += hours * 60;
    totalMinutes += minutes;
    return totalMinutes;
  };

  const startDeMinutes = minutesFromDayStart(startTime);
  const endDeMinutes = minutesFromDayStart(endTime);

  return endDeMinutes - startDeMinutes;
};

/**
 * Get a object with all properties regarding current time and day
 * @returns {{ hours: Number, minutes: Number, seconds: Number, pm: boolean, day: String }} Am object with all details regarding current time and current day
 */
export const getCurrentTimeAndDay = () => {
  let currentTime = getCurrentTime();
  let arr1 = currentTime.split(' ');
  let arr2 = arr1[0].split(':');

  const timeObj = {
    hours: Number(arr2),
    minutes: Number(arr2[1]),
    seconds: Number(arr2[2]),
    pm: arr1[1] === 'PM',
    day: getCurrentDay().toLowerCase(),
  };

  return timeObj;
};

/**
 * Converts milli seconds to its hours minutes and seconds components
 * @param {Number} time - The time to be converted (in milliseconds)
 * @param {Boolean} includeSeconds - Boolean whether to include seconds
 * @returns {{ hours: Number, minutes: Number, seconds: Number }} The hours, minutes and seconds
 */
export const milliToTimeObj = (time, includeSeconds) => {
  var hours = Math.floor(time / 1000 / 60 / 60);
  time -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(time / 1000 / 60);
  time -= minutes * 1000 * 60;
  if (!includeSeconds) {
    return { hours, minutes }
  }
  var seconds = Math.floor(time / 1000);
  time -= seconds * 1000;
  return { hours, minutes, seconds }
}