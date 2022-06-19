import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { flexCenter } from '../styles/styleUtils'
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
  dayToShowToggled
} from '../redux/slices/configsSlice'
import { DayStringTypes } from '../@types/DayAndTimeInterfaces'
import { daysArray, dayStrings } from '../utils/strings'
import TextButton from './TextButton'
import { blocksCleared } from '../redux/slices/timetableSlice'

export const AboutTab = () => {
  const appVersion = useSelector(selectVersion)

  return (
    <ComponentContainer>
      <AppLogo src={Logo} alt='Time Raptor' />
      <h2>Time Raptor</h2>
      App Version {appVersion}
      <EmojiTextContainer
        className='bot-text-sec'
        role='link'
        onClick={openRepo}
        style={{ cursor: 'pointer', margin: '10px 0' }}
      >
        <EmojiImage src={Octocat} alt='GitHub' />
        <div style={{ position: 'relative' }}>
          <span className='text-link'>GitHub</span>
        </div>
      </EmojiTextContainer>
      <EmojiTextContainer style={{ marginTop: '1px' }}>
        <EmojiImage src={WaveEmoji} alt='Hi!' />
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
          <CheckBox
            checked={configs.app.darkMode}
            onClick={() => dispatch(darkModeToggled())}
          />
        </Option>
        <Option>
          <OptionText>Close on exit</OptionText>
          <CheckBox
            checked={configs.app.closeOnExit}
            onClick={() => dispatch(closeOnExitToggled())}
          />
        </Option>
        <Option>
          <OptionText>Open minimized</OptionText>
          <CheckBox
            checked={configs.app.openMinimized}
            onClick={() => dispatch(openMinimizedToggled())}
          />
        </Option>
        <Option>
          <OptionText>
            <EmojiTextContainer
              role='link'
              onClick={quitApp}
              style={{ cursor: 'pointer' }}
            >
              <EmojiImage src={CrossEmoji} alt='Quit' />
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
          <CheckBox
            checked={configs.timetable.showCurrentTime}
            onClick={() => dispatch(showCurrentTimeToggled())}
          />
        </Option>
        <Option>
          <OptionText>Show current block on top</OptionText>
          <CheckBox
            checked={configs.timetable.showCurrentBlock}
            onClick={() => dispatch(showCurrentBlockToggled())}
          />
        </Option>
      </OptionsContainer>
      <div style={{ margin: '20px 0', width: '100%' }}>
        <h3>Configure Notifications</h3>
        <div>
          <OptionsContainer>
            <Option>
              <OptionText>Start Notifications</OptionText>
              <CheckBox
                checked={configs.timetable.startNotifications}
                onClick={() => dispatch(startNotificationsToggled())}
              />
            </Option>
            <Option>
              <OptionText>End Notifications</OptionText>
              <CheckBox
                checked={configs.timetable.endNotifications}
                onClick={() => dispatch(endNotificationsToggled())}
              />
            </Option>
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
          <CheckBox
            checked={daysToShow[day]}
            onClick={() => toggleDayToShow(day)}
          />
        </Option>
      )
    })

    dayOptions.push(
      <Option key='ShowDayOption-weekend'>
        <OptionText style={{ color: '#fd2513' }}>
          <EmojiImage src={PartyPopperEmoji} alt='Party Popper' />
          Weekend
          <EmojiImage src={PartyPopperEmoji} alt='Party Popper' />
        </OptionText>
        <CheckBox
          checked={daysToShow.saturday && daysToShow.sunday}
          onClick={toggleWeekendDaysToShow}
        />
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
  ${flexCenter()};
  /* margin: 10px 0; */

  .text-link {
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 2px;
      left: 0;
      border: 1px solid ${({ theme }) => theme.text};
    }
  }
`

const EmojiImage = styled.img`
  height: 20px;
  margin: 0 10px;
`

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px 20px;
`

const Option = styled.div`
  ${flexCenter({ flexDirection: 'row' })};
`

const OptionText = styled.div`
  width: 250px;
`
