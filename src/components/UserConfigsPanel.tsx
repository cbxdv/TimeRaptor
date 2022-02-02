import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Octocat from '../assets/icons/Octocat.png';
import WaveEmoji from '../assets/icons/Wave.png';
import WithModal from '../hooks/WithModal';
import { getElectronContext } from '../utils/ElectronContext';
import { blocksCleared } from '../redux/slices/timetableSlice';
import {
  darkModeToggled,
  notificationsToggled,
  closeOnExitToggled,
  selectConfigurations,
  showCurrentTimeToggled,
  showCurrentBlockToggled,
  openMinimizedToggled
} from '../redux/slices/userConfigsSlice';
import CheckBox from './CheckBox';
import TextButton from './TextButton';
import { flexCenter } from '../styles/styleUtils';

const UserConfigsPanel: React.FC<UserConfigsPanelProps> = ({
  closeHandler
}) => {
  const dispatch = useDispatch();

  const configurations = useSelector(selectConfigurations);

  const notificationsToggle = () => {
    dispatch(notificationsToggled());
  };
  const darkModeToggle = () => {
    dispatch(darkModeToggled());
  };
  const closeOnExitToggle = () => {
    dispatch(closeOnExitToggled());
  };
  const showCurrentTimeToggle = () => {
    dispatch(showCurrentTimeToggled());
  };
  const showCurrentBlockToggle = () => {
    dispatch(showCurrentBlockToggled());
  };
  const openMinimizedToggle = () => {
    dispatch(openMinimizedToggled());
  };

  const openRepo = () => {
    const electron = getElectronContext();
    electron.appOpenRepoLink();
  };

  const clearTimeBlocks = () => {
    dispatch(blocksCleared());
    closeHandler();
  };

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
              <CheckBox
                checked={configurations.darkMode}
                onClick={darkModeToggle}
              />
            </div>

            <div className='option-text'>Close on exit</div>
            <div className='option-config'>
              <CheckBox
                checked={configurations.closeOnExit}
                onClick={closeOnExitToggle}
              />
            </div>

            <div className='option-text'>Open minimized</div>
            <div className='option-config'>
              <CheckBox
                checked={configurations.openMinimized}
                onClick={openMinimizedToggle}
              />
            </div>

            <div className='option-text'>Show time on top</div>
            <div className='option-config'>
              <CheckBox
                checked={configurations.showCurrentTime}
                onClick={showCurrentTimeToggle}
              />
            </div>

            <div className='option-text'>Show current block on top</div>
            <div className='option-config'>
              <CheckBox
                checked={configurations.showCurrentBlock}
                onClick={showCurrentBlockToggle}
              />
            </div>
          </OptionsContainer>
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
            <img src={WaveEmoji} className='bot-text-img' alt='Hi!' />
            <span>Made by Cibi</span>
          </div>
          <div
            className='bot-text-sec'
            role='link'
            onClick={openRepo}
            style={{ cursor: 'pointer' }}
          >
            <img src={Octocat} className='bot-text-img' alt='GitHub' />
            <div style={{ position: 'relative' }}>
              <span className='bot-link'>GitHub</span>
            </div>
          </div>
        </BotText>
        <AppVersionContainer>
          App Version {configurations.appVersion}
        </AppVersionContainer>
      </UserConfigsPanelContainer>
    </WithModal>
  );
};

type UserConfigsPanelProps = {
  closeHandler: () => void;
};

const UserConfigsPanelContainer = styled.div`
  padding: 30px;
`;

const MainPanel = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  margin-bottom: 30px;
`;

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
`;

const ButtonContainer = styled.div`
  margin: 0 10px;
`;

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
`;

const AppVersionContainer = styled.div`
  ${flexCenter()};
  font-size: 14px;
  margin-top: 30px;
  color: grey;
`;

export default UserConfigsPanel;
