import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import Octocat from '../assets/icons/Octocat.png'
import WaveEmoji from '../assets/icons/Wave.png'
import WithModal from '../hooks/WithModal.jsx'
import { getElectronContext } from '../redux/helpers/ElectronContext.js'
import { blocksCleared } from '../redux/slices/timeBlocksSlice.js'
import {
  darkModeToggled,
  notificationsToggled,
  closeOnExitToggled,
  selectConfigurations,
  selectcloseOnExit
} from '../redux/slices/userConfigsSlice.js'
import CheckBox from './CheckBox.jsx'
import TextButton from './TextButton.jsx'
import { flexCenter } from '../styles/styleUtils.js'

const UserConfigsPanel = ({ closeHandler = () => {} }) => {
  const dispatch = useDispatch()

  const configurations = useSelector((state) => selectConfigurations(state))

  const notificationsToggle = () => {
    dispatch(notificationsToggled())
  }
  const darkModeToggle = () => {
    dispatch(darkModeToggled())
  }
  const closeOnExitToggle = () => {
    dispatch(closeOnExitToggled())
  }

  const openRepo = () => {
    try {
      const electron = getElectronContext()
      electron.appOpenRepoLink()
    } catch (error) {
      console.log(error)
    }
  }

  const clearTimeBlocks = () => {
    try {
      dispatch(blocksCleared())
      closeHandler()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <WithModal modalTitle='User Configurations' closeHandler={closeHandler}>
      <UserConfigsPanelContainer>
        <MainPanel>
          <OptionsContainer>
            <div className='option-text'>Notifications</div>
            <div className='option-config'>
              <CheckBox
                checked={configurations.notifications}
                onClick={notificationsToggle}
              />
            </div>
            <div className='option-text'>Dark Mode</div>
            <div className='option-config'>
              <CheckBox checked={configurations.darkMode} onClick={darkModeToggle} />
            </div>
            <div className='option-text'>Close On Exit</div>
            <div className='option-config'>
              <CheckBox checked={configurations.closeOnExit} onClick={closeOnExitToggle} />
            </div>
          </OptionsContainer>
          <ButtonContainer>
            <TextButton label='Clear Blocks' variant='danger' onClick={clearTimeBlocks} />
          </ButtonContainer>
        </MainPanel>
        <BotText>
          <div className='bot-text-sec'>
            <img src={WaveEmoji} className='bot-text-img' />
            <span>Made by Cibi</span>
          </div>
          <div className='bot-text-sec' onClick={openRepo} style={{ cursor: 'pointer' }}>
            <img src={Octocat} className='bot-text-img' />
            <div style={{ position: 'relative' }}>
              <span className='bot-link'>GitHub</span>
            </div>
          </div>
        </BotText>
      </UserConfigsPanelContainer>
    </WithModal>
  )
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
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 12px;
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

export default UserConfigsPanel
