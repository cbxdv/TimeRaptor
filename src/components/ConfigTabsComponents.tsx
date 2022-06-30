import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { emojiTextStyles, flexCenter } from '../styles/styleUtils'
import Logo from '../assets/Logo.png'
import {
  notificationServiceStarted,
  notificationServiceStopped,
  selectIsNotificationServiceRunning,
  selectVersion,
  updateTimeStamps
} from '../redux/slices/appSlice'
import Octocat from '../assets/icons/Octocat.png'
import WaveEmoji from '../assets/icons/Wave.png'
import CrossEmoji from '../assets/icons/Cross.png'
import PartyPopperEmoji from '../assets/icons/PartyPopper.png'
import { openRepo, quitApp } from '../utils/electronUtils'
import CheckBox from './CheckBox'
import {
  selectConfigs,
  darkModeToggled,
  timetableStartNotificationsToggled,
  timetableEndNotificationsToggled,
  closeOnExitToggled,
  openMinimizedToggled,
  timetableShowCurrentTimeToggled,
  timetableShowCurrentBlockToggled,
  selectTimetableDaysToShow,
  timetableDaysToShowToggled,
  timetableStartNotificationsBeforeChanged,
  timetableEndNotificationsBeforeChanged,
  todoNotificationToggled,
  todoDayProceduresToggled,
  dayPlannerShowCurrentTimeToggled,
  dayPlannerDayProceduresToggled,
  dayPlannerStartNotificationsToggled,
  dayPlannerEndNotificationsToggled,
  dayPlannerStartNotificationsBeforeChanged,
  dayPlannerEndNotificationsBeforeChanged,
  waterTrackerNotificationsToggled,
  waterTrackerShowCurrentTimeToggled,
  waterTrackerWaterIntervalChanged,
  dayPlannerShowTimetableToggled,
  dayPlannerShowTodoToggled
} from '../redux/slices/configsSlice'
import { DayStringTypes } from '../@types/DayAndTimeInterfaces'
import { daysArray, dayStrings } from '../utils/strings'
import TextButton from './TextButton'
import { blocksCleared } from '../redux/slices/timetableSlice'
import NumberInput from './NumberInput'
import { todosCleared } from '../redux/slices/todosSlice'
import { blocksCleared as dayPlannerBlocksCleared } from '../redux/slices/dayPlannerSlice'
import LED from './LED'
import {
  selectIsWaterTrackerServiceRunning,
  updateWaterTrackerData,
  waterTrackerStarted,
  waterTrackerStopped
} from '../redux/slices/waterTrackerSlice'

export const AboutTab = () => {
  const appVersion = useSelector(selectVersion)

  return (
    <ComponentContainer>
      <AppLogo src={Logo} alt='Time Raptor' />
      <h2>Time Raptor</h2>
      App Version {appVersion}
      <EmojiTextContainer
        role='link'
        onClick={openRepo}
        style={{ cursor: 'pointer', margin: '10px 0' }}
      >
        <img className='text-image' src={Octocat} alt='GitHub' />
        <div style={{ position: 'relative' }}>
          <span className='text-link'>GitHub</span>
        </div>
      </EmojiTextContainer>
      <EmojiTextContainer style={{ marginTop: '1px' }}>
        <img className='text-image' src={WaveEmoji} alt='Hi!' />
        <span>Made by Cibi</span>
      </EmojiTextContainer>
    </ComponentContainer>
  )
}

export const AppConfigsTab = () => {
  const dispatch = useDispatch()

  const configs = useSelector(selectConfigs)
  const isNotificationServiceRunning = useSelector(selectIsNotificationServiceRunning)

  const toggleNotificationService = () => {
    if (isNotificationServiceRunning) {
      dispatch(notificationServiceStopped())
    } else {
      dispatch(updateTimeStamps())
      dispatch(notificationServiceStarted())
    }
  }

  return (
    <ComponentContainer>
      <OptionsContainer>
        <Option>
          <OptionText>Dark Mode</OptionText>
          <OptionConfig>
            <CheckBox checked={configs.app.darkMode} onClick={() => dispatch(darkModeToggled())} />
          </OptionConfig>
        </Option>
        <Option>
          <OptionText>Close on exit</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.app.closeOnExit}
              onClick={() => dispatch(closeOnExitToggled())}
            />
          </OptionConfig>
        </Option>
        <Option>
          <OptionText>Open minimized</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.app.openMinimized}
              onClick={() => dispatch(openMinimizedToggled())}
            />
          </OptionConfig>
        </Option>
        <Option
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          Notification Service
          <div
            role='button'
            style={{ cursor: 'pointer', margin: '0 15px' }}
            onClick={toggleNotificationService}
          >
            {isNotificationServiceRunning ? <LED green /> : <LED red />}
          </div>
          <SubText>{isNotificationServiceRunning ? 'Running' : 'Not running'}</SubText>
        </Option>
      </OptionsContainer>
      <div style={{ marginTop: '20px' }}>
        <Option>
          <OptionText>
            <EmojiTextContainer role='link' onClick={quitApp} style={{ cursor: 'pointer' }}>
              <img className='text-image' src={CrossEmoji} alt='Quit' />
              <div style={{ position: 'relative' }}>
                <span className='text-link'>Quit app</span>
              </div>
            </EmojiTextContainer>
          </OptionText>
        </Option>
      </div>
    </ComponentContainer>
  )
}

export const TimetableConfigsTab = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const configs = useSelector(selectConfigs)

  return (
    <ComponentContainer>
      <OptionsContainer>
        <Option>
          <OptionText>Show time on top</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.timetable.showCurrentTime}
              onClick={() => dispatch(timetableShowCurrentTimeToggled())}
            />
          </OptionConfig>
        </Option>
        <Option>
          <OptionText>Show current block on top</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.timetable.showCurrentBlock}
              onClick={() => dispatch(timetableShowCurrentBlockToggled())}
            />
          </OptionConfig>
        </Option>
      </OptionsContainer>
      <div style={{ margin: '20px 0', width: '100%' }}>
        <h3>Configure Notifications</h3>
        <div>
          <OptionsContainer>
            <Option>
              <OptionText>Start Notifications</OptionText>
              <OptionConfig>
                <CheckBox
                  checked={configs.timetable.startNotifications}
                  onClick={() => {
                    dispatch(timetableStartNotificationsToggled())
                    dispatch(updateTimeStamps())
                  }}
                />
              </OptionConfig>
            </Option>
            <Option>
              <OptionText>End Notifications</OptionText>
              <OptionConfig>
                <CheckBox
                  checked={configs.timetable.endNotifications}
                  onClick={() => {
                    dispatch(timetableEndNotificationsToggled())
                    dispatch(updateTimeStamps())
                  }}
                />
              </OptionConfig>
            </Option>
            <OptionSingle>
              <OptionConfig style={{ justifyContent: 'flex-start' }}>
                Start before
                <div style={{ margin: '0 10px' }}>
                  <NumberInput
                    start={0}
                    end={55}
                    step={1}
                    value={configs.timetable.startNotificationsBefore}
                    incrementHandler={() => {
                      dispatch(
                        timetableStartNotificationsBeforeChanged(
                          configs.timetable.startNotificationsBefore + 1
                        )
                      )
                      dispatch(updateTimeStamps())
                    }}
                    decrementHandler={() => {
                      dispatch(
                        timetableStartNotificationsBeforeChanged(
                          configs.timetable.startNotificationsBefore - 1
                        )
                      )
                      dispatch(updateTimeStamps())
                    }}
                  />
                </div>
                minutes
              </OptionConfig>
            </OptionSingle>
            <OptionSingle>
              <OptionConfig style={{ justifyContent: 'flex-start' }}>
                End before
                <div style={{ margin: '0 10px' }}>
                  <NumberInput
                    start={0}
                    end={55}
                    step={1}
                    value={configs.timetable.endNotificationsBefore}
                    incrementHandler={() => {
                      dispatch(
                        timetableEndNotificationsBeforeChanged(
                          configs.timetable.endNotificationsBefore + 1
                        )
                      )
                      dispatch(updateTimeStamps())
                    }}
                    decrementHandler={() => {
                      dispatch(
                        timetableEndNotificationsBeforeChanged(
                          configs.timetable.endNotificationsBefore - 1
                        )
                      )
                      dispatch(updateTimeStamps())
                    }}
                  />
                </div>
                minutes
              </OptionConfig>
            </OptionSingle>
          </OptionsContainer>
        </div>
      </div>
      <div>
        <h3>Configure Days</h3>
        <div style={{ marginBottom: '20px' }}>
          <DaysToShowComponent />
        </div>
      </div>
      <div>
        <Option>
          <TextButton
            label='Clear Blocks'
            variant='danger'
            onClick={() => {
              dispatch(blocksCleared())
              navigate('/', { replace: true })
            }}
          />
        </Option>
      </div>
    </ComponentContainer>
  )
}

const DaysToShowComponent = () => {
  const dispatch = useDispatch()
  const daysToShow = useSelector(selectTimetableDaysToShow)

  const toggleDayToShow = (day: DayStringTypes) => {
    dispatch(timetableDaysToShowToggled(day))
  }

  const toggleWeekendDaysToShow = () => {
    if ((daysToShow.saturday && daysToShow.sunday) === true) {
      dispatch(timetableDaysToShowToggled('saturday'))
      dispatch(timetableDaysToShowToggled('sunday'))
    } else {
      if (daysToShow.saturday === false) {
        dispatch(timetableDaysToShowToggled('saturday'))
      }
      if (daysToShow.sunday === false) {
        dispatch(timetableDaysToShowToggled('sunday'))
      }
    }
  }

  const generateOptions = () => {
    const dayOptions: React.ReactElement[] = []

    daysArray.forEach((day: DayStringTypes) => {
      dayOptions.push(
        <Option key={`ShowDayOption-${day}`}>
          <OptionText>{dayStrings(day)}</OptionText>
          <OptionConfig>
            <CheckBox checked={daysToShow[day]} onClick={() => toggleDayToShow(day)} />
          </OptionConfig>
        </Option>
      )
    })

    dayOptions.push(
      <Option key='ShowDayOption-weekend'>
        <OptionText style={{ color: '#fd2513' }}>
          <EmojiTextContainer style={{ justifyContent: 'flex-start' }}>
            <img className='text-image' src={PartyPopperEmoji} alt='Party Popper' />
            Weekend
            <img className='text-image' src={PartyPopperEmoji} alt='Party Popper' />
          </EmojiTextContainer>
        </OptionText>
        <OptionConfig>
          <CheckBox
            checked={daysToShow.saturday && daysToShow.sunday}
            onClick={toggleWeekendDaysToShow}
          />
        </OptionConfig>
      </Option>
    )

    return dayOptions
  }

  return <OptionsContainer>{generateOptions()}</OptionsContainer>
}

export const TodosConfigsTab = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const configs = useSelector(selectConfigs)

  return (
    <ComponentContainer>
      <OptionsContainer>
        <Option>
          <OptionText>Notifications</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.todo.notifications}
              onClick={() => {
                dispatch(todoNotificationToggled())
                dispatch(updateTimeStamps())
              }}
            />
          </OptionConfig>
        </Option>

        <Option>
          <OptionText>Day Procedures</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.todo.dayProcedures}
              onClick={() => dispatch(todoDayProceduresToggled())}
            />
          </OptionConfig>
        </Option>
      </OptionsContainer>
      <div style={{ marginTop: '20px' }}>
        <Option>
          <TextButton
            label='Clear Todos'
            variant='danger'
            onClick={() => {
              dispatch(todosCleared())
              navigate('/', { replace: true })
            }}
          />
        </Option>
      </div>
    </ComponentContainer>
  )
}

export const DayPlannerConfigsTab = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const configs = useSelector(selectConfigs)

  return (
    <ComponentContainer>
      <OptionsContainer>
        <Option>
          <OptionText>Show time on top</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.dayPlanner.showCurrentTime}
              onClick={() => dispatch(dayPlannerShowCurrentTimeToggled())}
            />
          </OptionConfig>
        </Option>
        <Option>
          <OptionText>Day Procedures</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.dayPlanner.dayProcedures}
              onClick={() => dispatch(dayPlannerDayProceduresToggled())}
            />
          </OptionConfig>
        </Option>
        <Option>
          <OptionText>Show Timetable</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.dayPlanner.showTimetable}
              onClick={() => dispatch(dayPlannerShowTimetableToggled())}
            />
          </OptionConfig>
        </Option>
        <Option>
          <OptionText>Show Todo</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.dayPlanner.showTodo}
              onClick={() => dispatch(dayPlannerShowTodoToggled())}
            />
          </OptionConfig>
        </Option>
      </OptionsContainer>
      <div style={{ margin: '20px 0', width: '100%' }}>
        <h3>Configure Notifications</h3>
        <div>
          <OptionsContainer>
            <Option>
              <OptionText>Start Notifications</OptionText>
              <OptionConfig>
                <CheckBox
                  checked={configs.dayPlanner.startNotifications}
                  onClick={() => {
                    dispatch(dayPlannerStartNotificationsToggled())
                    dispatch(updateTimeStamps())
                  }}
                />
              </OptionConfig>
            </Option>
            <Option>
              <OptionText>End Notifications</OptionText>
              <OptionConfig>
                <CheckBox
                  checked={configs.dayPlanner.endNotifications}
                  onClick={() => {
                    dispatch(dayPlannerEndNotificationsToggled())
                    dispatch(updateTimeStamps())
                  }}
                />
              </OptionConfig>
            </Option>
            <OptionSingle>
              <OptionConfig style={{ justifyContent: 'flex-start' }}>
                Start before
                <div style={{ margin: '0 10px' }}>
                  <NumberInput
                    start={0}
                    end={55}
                    step={1}
                    value={configs.dayPlanner.startNotificationsBefore}
                    incrementHandler={() => {
                      dispatch(
                        dayPlannerStartNotificationsBeforeChanged(
                          configs.dayPlanner.startNotificationsBefore + 1
                        )
                      )
                      dispatch(updateTimeStamps())
                    }}
                    decrementHandler={() => {
                      dispatch(
                        dayPlannerStartNotificationsBeforeChanged(
                          configs.dayPlanner.startNotificationsBefore - 1
                        )
                      )
                      dispatch(updateTimeStamps())
                    }}
                  />
                </div>
                minutes
              </OptionConfig>
            </OptionSingle>
            <OptionSingle>
              <OptionConfig style={{ justifyContent: 'flex-start' }}>
                End before
                <div style={{ margin: '0 10px' }}>
                  <NumberInput
                    start={0}
                    end={55}
                    step={1}
                    value={configs.dayPlanner.endNotificationsBefore}
                    incrementHandler={() => {
                      dispatch(
                        dayPlannerEndNotificationsBeforeChanged(
                          configs.dayPlanner.endNotificationsBefore + 1
                        )
                      )
                      dispatch(updateTimeStamps())
                    }}
                    decrementHandler={() => {
                      dispatch(
                        dayPlannerEndNotificationsBeforeChanged(
                          configs.dayPlanner.endNotificationsBefore - 1
                        )
                      )
                      dispatch(updateTimeStamps())
                    }}
                  />
                </div>
                minutes
              </OptionConfig>
            </OptionSingle>
          </OptionsContainer>
        </div>
      </div>
      <div>
        <Option>
          <TextButton
            label='Clear Blocks'
            variant='danger'
            onClick={() => {
              dispatch(dayPlannerBlocksCleared())
              navigate('/', { replace: true })
            }}
          />
        </Option>
      </div>
    </ComponentContainer>
  )
}

export const WaterTrackerConfigsTab = () => {
  const dispatch = useDispatch()

  const configs = useSelector(selectConfigs)
  const isServiceRunning = useSelector(selectIsWaterTrackerServiceRunning)

  const toggleService = () => {
    if (isServiceRunning) {
      dispatch(waterTrackerStopped())
    } else {
      dispatch(waterTrackerStarted())
    }
  }

  return (
    <ComponentContainer>
      <OptionsContainer>
        <Option>
          <OptionText>Notifications</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.waterTracker.notifications}
              onClick={() => {
                dispatch(waterTrackerNotificationsToggled())
                dispatch(updateWaterTrackerData())
              }}
            />
          </OptionConfig>
        </Option>
        <Option>
          <OptionText>Show current time</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.waterTracker.showCurrentTime}
              onClick={() => dispatch(waterTrackerShowCurrentTimeToggled())}
            />
          </OptionConfig>
        </Option>

        <Option>
          <OptionConfig style={{ justifyContent: 'flex-start' }}>
            Interval
            <div style={{ margin: '0 10px' }}>
              <NumberInput
                start={30}
                end={200}
                step={5}
                value={configs.waterTracker.waterInterval}
                incrementHandler={() => {
                  dispatch(waterTrackerWaterIntervalChanged(configs.waterTracker.waterInterval + 5))
                  dispatch(updateWaterTrackerData())
                }}
                decrementHandler={() => {
                  dispatch(waterTrackerWaterIntervalChanged(configs.waterTracker.waterInterval - 5))
                  dispatch(updateWaterTrackerData())
                }}
              />
            </div>
            minutes
          </OptionConfig>
        </Option>

        <Option
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          Tracker Service
          <div
            role='button'
            style={{ cursor: 'pointer', margin: '0 15px' }}
            onClick={toggleService}
          >
            {isServiceRunning ? <LED green /> : <LED red />}
          </div>
          <SubText>{isServiceRunning ? 'Running' : 'Not running'}</SubText>
        </Option>
      </OptionsContainer>
    </ComponentContainer>
  )
}

const ComponentContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  width: 100%;
  line-height: 2;
`

const SubText = styled.div`
  color: ${({ theme }) => (theme.name === 'dark' ? theme.accent : 'lightGrey')};
  font-size: 13px;
  width: 70px;
  text-align: right;
`

const AppLogo = styled.img`
  height: 100px;
  margin-bottom: 20px;
`

const EmojiTextContainer = styled.div`
  ${emojiTextStyles()};
`

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px 30px;
`

const Option = styled.div`
  /* ${flexCenter({ flexDirection: 'row' })}; */
  display: grid;
  grid-template-columns: 250px 30px;
`

const OptionText = styled.div`
  width: 250px;
`

const OptionConfig = styled.div`
  ${flexCenter()};
  width: 100%;
`

const OptionSingle = styled.div`
  ${flexCenter()};
`
