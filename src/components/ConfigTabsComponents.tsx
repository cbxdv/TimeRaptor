import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { emojiTextStyles, flexCenter } from '../styles/styleUtils'
import Logo from '../assets/Logo.png'
import { selectVersion } from '../redux/slices/appSlice'
import Octocat from '../assets/icons/Octocat.png'
import WaveEmoji from '../assets/icons/Wave.png'
import CrossEmoji from '../assets/icons/Cross.png'
import PartyPopperEmoji from '../assets/icons/PartyPopper.png'
import { openRepo, quitApp } from '../utils/electronUtils'
import CheckBox from './CheckBox'
import {
  selectConfigs,
  darkModeToggled,
  startNotificationsToggled,
  endNotificationsToggled,
  closeOnExitToggled,
  openMinimizedToggled,
  showCurrentTimeToggled,
  showCurrentBlockToggled,
  selectDaysToShow,
  dayToShowToggled,
  startNotificationsBeforeChanged,
  endNotificationsBeforeChanged
} from '../redux/slices/configsSlice'
import { DayStringTypes } from '../@types/DayAndTimeInterfaces'
import { daysArray, dayStrings } from '../utils/strings'
import TextButton from './TextButton'
import { blocksCleared } from '../redux/slices/timetableSlice'
import NumberInput from './NumberInput'

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

  return (
    <ComponentContainer>
      <OptionsContainer>
        <Option>
          <OptionText>Dark Mode</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.app.darkMode}
              onClick={() => dispatch(darkModeToggled())}
            />
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
        <Option>
          <OptionText>
            <EmojiTextContainer
              role='link'
              onClick={quitApp}
              style={{ cursor: 'pointer' }}
            >
              <img className='text-image' src={CrossEmoji} alt='Quit' />
              <div style={{ position: 'relative' }}>
                <span className='text-link'>Quit app</span>
              </div>
            </EmojiTextContainer>
          </OptionText>
        </Option>
      </OptionsContainer>
    </ComponentContainer>
  )
}

export const TimetableConfigsTab = () => {
  const dispatch = useDispatch()

  const configs = useSelector(selectConfigs)

  return (
    <ComponentContainer>
      <OptionsContainer>
        <Option>
          <OptionText>Show time on top</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.timetable.showCurrentTime}
              onClick={() => dispatch(showCurrentTimeToggled())}
            />
          </OptionConfig>
        </Option>
        <Option>
          <OptionText>Show current block on top</OptionText>
          <OptionConfig>
            <CheckBox
              checked={configs.timetable.showCurrentBlock}
              onClick={() => dispatch(showCurrentBlockToggled())}
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
                  onClick={() => dispatch(startNotificationsToggled())}
                />
              </OptionConfig>
            </Option>
            <Option>
              <OptionText>End Notifications</OptionText>
              <OptionConfig>
                <CheckBox
                  checked={configs.timetable.endNotifications}
                  onClick={() => dispatch(endNotificationsToggled())}
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
                        startNotificationsBeforeChanged(
                          configs.timetable.startNotificationsBefore + 1
                        )
                      )
                    }}
                    decrementHandler={() => {
                      dispatch(
                        startNotificationsBeforeChanged(
                          configs.timetable.startNotificationsBefore - 1
                        )
                      )
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
                        endNotificationsBeforeChanged(
                          configs.timetable.endNotificationsBefore + 1
                        )
                      )
                    }}
                    decrementHandler={() => {
                      dispatch(
                        endNotificationsBeforeChanged(
                          configs.timetable.endNotificationsBefore - 1
                        )
                      )
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
            onClick={() => dispatch(blocksCleared())}
          />
        </Option>
      </div>
    </ComponentContainer>
  )
}

const DaysToShowComponent = () => {
  const dispatch = useDispatch()
  const daysToShow = useSelector(selectDaysToShow)

  const toggleDayToShow = (day: DayStringTypes) => {
    dispatch(dayToShowToggled(day))
  }

  const toggleWeekendDaysToShow = () => {
    if ((daysToShow.saturday && daysToShow.sunday) === true) {
      dispatch(dayToShowToggled('saturday'))
      dispatch(dayToShowToggled('sunday'))
    } else {
      if (daysToShow.saturday === false) {
        dispatch(dayToShowToggled('saturday'))
      }
      if (daysToShow.sunday === false) {
        dispatch(dayToShowToggled('sunday'))
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
            <CheckBox
              checked={daysToShow[day]}
              onClick={() => toggleDayToShow(day)}
            />
          </OptionConfig>
        </Option>
      )
    })

    dayOptions.push(
      <Option key='ShowDayOption-weekend'>
        <OptionText style={{ color: '#fd2513' }}>
          <EmojiTextContainer style={{ justifyContent: 'flex-start' }}>
            <img
              className='text-image'
              src={PartyPopperEmoji}
              alt='Party Popper'
            />
            Weekend
            <img
              className='text-image'
              src={PartyPopperEmoji}
              alt='Party Popper'
            />
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

const ComponentContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  width: 100%;
  line-height: 2;
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
