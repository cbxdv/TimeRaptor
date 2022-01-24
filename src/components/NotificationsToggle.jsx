import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import {
  notificationsToggled,
  selectNotificationState
} from '../redux/slices/userConfigsSlice'

import NotificationsActiveIcon from '../assets/icons/NotificationsActive.svg'
import NotificationsOffIcon from '../assets/icons/NotificationsOff.svg'

import { flexCenter, buttonStyles } from '../styles/styleUtils'

const NotificationsToggle = () => {
  const dispatch = useDispatch()

  const active = useSelector(state => selectNotificationState(state))

  const toggleNotifications = () => {
    dispatch(notificationsToggled())
  }

  const keyBindHandler = event => {
    if (event.key === 'n' || event.key === 'N') {
      toggleNotifications()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyBindHandler)
    return () => {
      document.removeEventListener('keydown', keyBindHandler)
    }
  })

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
  ${flexCenter()};
  ${buttonStyles()};
  height: 40px;
  width: 40px;
  border-radius: 8px;
`

export default NotificationsToggle
