import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { DayStringTypes } from '../@types/DayAndTimeInterfaces'
import Octocat from '../assets/icons/Octocat.png'
import WaveEmoji from '../assets/icons/Wave.png'
import PartyPopperEmoji from '../assets/icons/PartyPopper.png'
import WithModal from '../wrappers/WithModal'
import { getElectronContext } from '../utils/electronUtils'
import { daysArray, dayStrings } from '../utils/strings'
import { blocksCleared } from '../redux/slices/timetableSlice'
import {
  selectConfigs,
  darkModeToggled,
  notificationsToggled,
  closeOnExitToggled,
  openMinimizedToggled,
  showCurrentTimeToggled,
  showCurrentBlockToggled,
  selectDaysToShow,
  dayToShowToggled
} from '../redux/slices/configsSlice'
import { selectVersion } from '../redux/slices/appSlice'
import CheckBox from './CheckBox'
import TextButton from './TextButton'
import { flexCenter } from '../styles/styleUtils'

const UserConfigsPanel: React.FC<UserConfigsPanelProps> = ({
  closeHandler
}) => {
  const dispatch = useDispatch()

  const [showDaysToShowPanel, setShowDaysToShowPanel] = useState<boolean>(false)

  const configs = useSelector(selectConfigs)
  const appVersion = useSelector(selectVersion)

  const openRepo = () => {
    const electron = getElectronContext()
    electron.appOpenRepoLink()
  }

  const clearTimeBlocks = () => {
    dispatch(blocksCleared())
  }

  return (
    <WithModal modalTitle='User Configurations' closeHandler={closeHandler}>
      {showDaysToShowPanel && (
        <DaysToShowPanel closeHandler={() => setShowDaysToShowPanel(false)} />
      )}
      <UserConfigsPanelContainer>
        <MainPanel>
          <OptionsContainer>
            <div className='option-text'>Notifications</div>
            <div className='option-config'>
              <CheckBox
                checked={configs.timetable.notifications}
                onClick={() => dispatch(notificationsToggled())}
              />
            </div>

            <div className='option-text'>Dark Mode</div>
            <div className='option-config'>
              <CheckBox
                checked={configs.app.darkMode}
                onClick={() => dispatch(darkModeToggled())}
              />
            </div>

            <div className='option-text'>Close on exit</div>
            <div className='option-config'>
              <CheckBox
                checked={configs.app.closeOnExit}
                onClick={() => dispatch(closeOnExitToggled())}
              />
            </div>

            <div className='option-text'>Open minimized</div>
            <div className='option-config'>
              <CheckBox
                checked={configs.app.openMinimized}
                onClick={() => dispatch(openMinimizedToggled())}
              />
            </div>

            <div className='option-text'>Show time on top</div>
            <div className='option-config'>
              <CheckBox
                checked={configs.timetable.showCurrentTime}
                onClick={() => dispatch(showCurrentTimeToggled())}
              />
            </div>

            <div className='option-text'>Show current block on top</div>
            <div className='option-config'>
              <CheckBox
                checked={configs.timetable.showCurrentBlock}
                onClick={() => dispatch(showCurrentBlockToggled())}
              />
            </div>
          </OptionsContainer>
          <ButtonContainer>
            <TextButton
              label='Configure Days'
              variant='success'
              onClick={() => setShowDaysToShowPanel(true)}
            />
            <TextButton
              label='Clear Blocks'
              variant='danger'
              onClick={clearTimeBlocks}
            />
          </ButtonContainer>
        </MainPanel>
        <BotText>
          <div className='bot-text-sec'>
            <EmojiImage src={WaveEmoji} alt='Hi!' />
            <span>Made by Cibi</span>
          </div>
          <div
            className='bot-text-sec'
            role='link'
            onClick={openRepo}
            style={{ cursor: 'pointer' }}
          >
            <EmojiImage src={Octocat} alt='GitHub' />
            <div style={{ position: 'relative' }}>
              <span className='bot-link'>GitHub</span>
            </div>
          </div>
        </BotText>
        <AppVersionContainer>App Version {appVersion}</AppVersionContainer>
      </UserConfigsPanelContainer>
    </WithModal>
  )
}

type UserConfigsPanelProps = {
  closeHandler: () => void
}

const DaysToShowPanel: React.FC<DaysToShowPanelProps> = ({ closeHandler }) => {
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
        <React.Fragment key={`ShowDayOption-${day}`}>
          <div className='option-text'>{dayStrings(day)}</div>
          <div className='option-config'>
            <CheckBox
              checked={daysToShow[day]}
              onClick={() => toggleDayToShow(day)}
            />
          </div>
        </React.Fragment>
      )
    })

    dayOptions.push(
      <React.Fragment key='ShowDayOption-weekend'>
        <div className='option-text' style={{ color: '#fd2513' }}>
          <EmojiImage src={PartyPopperEmoji} alt='Party Popper' />
          Weekend
          <EmojiImage src={PartyPopperEmoji} alt='Party Popper' />
        </div>
        <div className='option-config'>
          <CheckBox
            checked={daysToShow.saturday && daysToShow.sunday}
            onClick={toggleWeekendDaysToShow}
          />
        </div>
      </React.Fragment>
    )

    return dayOptions
  }

  return (
    <WithModal modalTitle='Select days to show' closeHandler={closeHandler}>
      <UserConfigsPanelContainer>
        <ShowDaysOptionsContainer>{generateOptions()}</ShowDaysOptionsContainer>
      </UserConfigsPanelContainer>
    </WithModal>
  )
}

type DaysToShowPanelProps = {
  closeHandler: () => void
}

const UserConfigsPanelContainer = styled.div`
  padding: 30px;
`

const MainPanel = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  margin-bottom: 30px;
`

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  margin-bottom: 30px;

  .option-text {
    ${flexCenter()};
    font-weight: bold;
  }

  .option-config {
    ${flexCenter()};
  }
`

const ButtonContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  margin: 0 10px;
`

const EmojiImage = styled.img`
  height: 25px;
  margin: 0 10px;
`

const BotText = styled.div`
  ${flexCenter()}
  font-family: Dongle;
  font-size: 24px;

  .bot-text-sec {
    ${flexCenter()};
    margin: 0 30px;
  }

  .bot-text-img {
    height: 30px;
    margin-right: 10px;
  }

  .bot-link {
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 8px;
      left: 0;
      border: 1px solid ${({ theme }) => theme.text};
    }
  }
`

const AppVersionContainer = styled.div`
  ${flexCenter()};
  font-size: 14px;
  margin-top: 30px;
  color: grey;
`

const ShowDaysOptionsContainer = styled(OptionsContainer)`
  grid-template-columns: 1fr 50px 1fr 50px;
`

export default UserConfigsPanel
