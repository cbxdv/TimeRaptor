import React from 'react'
import styled from 'styled-components'

import WithModal from '../hooks/WithModal.jsx'

import WaveEmoji from '../assets/icons/Wave.png'
import Octocat from '../assets/icons/Octocat.png'

import { flexCenter } from '../styles/styleUtils.js'
import { getElectronContext } from '../redux/helpers/ElectronContext.js'
import TextButton from './TextButton.jsx'

const UserConfigsPanel = ({ closeHandler = () => {} }) => {
  const openRepo = () => {
    try {
      const electron = getElectronContext()
      electron.appOpenLink('https://github.com/codeph0/TimeRaptor')
    } catch (error) {
      console.log(error)
    }
  }

  const clearTimeBlocks = () => {
    try {
      const electron = getElectronContext()
      electron.clearAllTimeBlocks()
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <WithModal modalTitle='User Configurations' closeHandler={closeHandler}>
      <UserConfigsPanelContainer>
        <MainPanel>
          <ButtonContainer>
            <TextButton
              label='Clear Blocks'
              variant='danger'
              onClick={clearTimeBlocks}
            />
          </ButtonContainer>
        </MainPanel>
        <BotText>
          <div className='bot-text-sec'>
            <img src={WaveEmoji} className='bot-text-img' />
            <span>Made by Cibi</span>
          </div>
          <div
            className='bot-text-sec'
            onClick={openRepo}
            style={{ cursor: 'pointer' }}
          >
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
  ${flexCenter()};
  margin-bottom: 30px;
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
      border: 1px solid black;
    }
  }
`

export default UserConfigsPanel
