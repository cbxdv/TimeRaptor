import { fetchConfigsData, updateDayPlannerDataToDisk } from './electronUtils'
import { checkWhetherYesterday } from './timeUtils'
import {
  IDayPlannerBlock,
  IDayPlannerData
} from '../@types/DayPlannerInterfaces'

// eslint-disable-next-line import/prefer-default-export
export const dayPlannerDayProcedures = async (data: IDayPlannerData) => {
  const configs = await fetchConfigsData()

  if (configs && configs.todoConfigs) {
    if (!configs.dayPlannerConfigs.dayProcedures) return data
  }
  if (!checkWhetherYesterday(data.lastUpdated)) return data

  const currentDay: IDayPlannerBlock[] = []

  data.dayData.nextDay.forEach(block => {
    const newBlock: IDayPlannerBlock = {
      ...block,
      day: 'currentDay'
    }
    currentDay.push(newBlock)
  })

  const newData: IDayPlannerData = {
    lastUpdated: new Date().valueOf(),
    dayData: {
      currentDay,
      nextDay: []
    }
  }

  updateDayPlannerDataToDisk(newData)
  return newData
}
