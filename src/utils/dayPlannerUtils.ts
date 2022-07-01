import { fetchConfigsData, updateDayPlannerDataToDisk } from './electronUtils'
import { checkWhetherYesterday } from './timeUtils'
import { IDayPlannerBlock, IDayPlannerData } from '../@types/DayPlannerInterfaces'

// eslint-disable-next-line import/prefer-default-export
export const dayPlannerDayProcedures = async (data: IDayPlannerData) => {
  const configs = await fetchConfigsData()

  if (configs && configs.todoConfigs) {
    if (!configs.dayPlannerConfigs.dayProcedures) return data
  }
  if (!checkWhetherYesterday(data.lastUpdated)) return data

  const currentDay: IDayPlannerBlock[] = []
  const nextDay: IDayPlannerBlock[] = []

  data.dayData.nextDay.forEach(block => {
    const newBlock: IDayPlannerBlock = {
      ...block,
      day: 'currentDay'
    }
    currentDay.push(newBlock)
  })

  data.dayData.nextDay.forEach(block => {
    if (block.isRecurringEveryday) {
      // add to current day
      const newCurrentDayBlock: IDayPlannerBlock = {
        ...block,
        day: 'currentDay'
      }
      currentDay.push(newCurrentDayBlock)

      // add to next day
      const newNextDayBlock: IDayPlannerBlock = {
        ...block,
        day: 'nextDay'
      }
      nextDay.push(newNextDayBlock)
    }
  })

  const newData: IDayPlannerData = {
    lastUpdated: new Date().valueOf(),
    dayData: {
      currentDay,
      nextDay
    }
  }

  updateDayPlannerDataToDisk(newData)
  return newData
}
