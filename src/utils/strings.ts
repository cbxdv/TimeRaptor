import { DayStringTypes } from '../@types/DayAndTimeInterfaces'
import { ColorStringTypes } from '../@types/TimeBlockInterfaces'
import { DayPlannerDayTypes } from '../@types/DayPlannerInterfaces'

export const dayStrings = (day: DayStringTypes) => {
  switch (day) {
    case 'monday':
      return 'Monday'
    case 'tuesday':
      return 'Tuesday'
    case 'wednesday':
      return 'Wednesday'
    case 'thursday':
      return 'Thursday'
    case 'friday':
      return 'Friday'
    case 'saturday':
      return 'Saturday'
    case 'sunday':
      return 'Sunday'
    default:
      return ''
  }
}

export const varietyColorStrings = (color: ColorStringTypes) => {
  switch (color) {
    case 'decoPeach':
      return 'Deco Peach'
    case 'deepChampagne':
      return 'Deep Champagne'
    case 'crayola':
      return 'Crayola'
    case 'teaGreen':
      return 'Tea Green'
    case 'celeste':
      return 'Celeste'
    case 'babyBlueEyes':
      return 'Baby Blue Eyes'
    case 'greyedLavender':
      return 'Greyed Lavender'
    case 'mauve':
      return 'Mauve'
    case 'linen':
      return 'Linen'
    case 'beige':
      return 'Beige'
    default:
      return ''
  }
}

export const daysArray: DayStringTypes[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]

export const dayPlannerDaysArray: DayPlannerDayTypes[] = ['currentDay', 'nextDay']

export const dayPlannerDayString = (dayPlannerDay: DayPlannerDayTypes) => {
  switch (dayPlannerDay) {
    case 'currentDay':
      return 'Current Day'
    case 'nextDay':
      return 'Next Day'
    default:
      return ''
  }
}
