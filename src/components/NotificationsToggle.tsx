import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import {
  selectNotificationStateCombined,
  notificationsToggled
} from '../redux/slices/configsSlice'

import NotificationsActiveIcon from '../assets/icons/NotificationsActive.svg'
import NotificationsOffIcon from '../assets/icons/NotificationsOff.svg'

import { flexCenter, buttonStyles } from '../styles/styleUtils'

const NotificationsToggle = () => {
  const dispatch = useDispatch()

  const active = useSelector(selectNotificationStateCombined)

  const toggleNotifications = () => {
    dispatch(notificationsToggled())
  }

  const keyBindHandler = (event: KeyboardEvent) => {
    if ((event.key === 'n' || event.key === 'N') && event.ctrlKey) {
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
    <NTContainer onClick={toggleNotifications}>
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
