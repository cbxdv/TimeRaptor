import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { notificationsToggled, selectNotificationState } from '../redux/slices/userConfigsSlice.js'

import NotificationsActiveIcon from '../assets/icons/NotificationsActive.svg'
import NotificationsOffIcon from '../assets/icons/NotificationsOff.svg'

import { flexCenter, buttonStyles } from '../styles/styleUtils.js'
import { themeColors } from '../styles/styleConstants.js'

const NotificationsToggle = () => {
  const dispatch = useDispatch()

  const active = useSelector(state => selectNotificationState(state))

  const toggleNotifications = () => {
    dispatch(notificationsToggled())
  }

  return (
    <NTContainer active={active} onClick={toggleNotifications}>
      {!active ? (
        <NotificationsOffIcon fill='red' />
      ) : (
        <NotificationsActiveIcon />
      )}
    </NTContainer>
  )
}

const NTContainer = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 8px;
  ${flexCenter()};
  ${buttonStyles()};
  background-color: ${(props) =>
    !props.active ? themeColors.shade1 : themeColors.background};
  border: ${(props) => props.active ? `2px` : `0`} solid ${themeColors.accent};
  cursor: pointer;

  & > svg {
    fill: ${themeColors.accent};
  }

  &:active {
    transform: scale(0.95);
  }
`

export default NotificationsToggle
