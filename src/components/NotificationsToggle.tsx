import React from 'react'
import styled from 'styled-components'

import NotificationsActiveIcon from '../assets/icons/NotificationsActive.svg'
import NotificationsOffIcon from '../assets/icons/NotificationsOff.svg'

import { flexCenter, buttonStyles } from '../styles/styleUtils'

const NotificationsToggle: React.FC<NotificationToggleProps> = ({
  active,
  toggleNotifications
}) => (
  <NTContainer onClick={toggleNotifications}>
    {!active ? <NotificationsOffIcon fill='red' /> : <NotificationsActiveIcon />}
  </NTContainer>
)

type NotificationToggleProps = {
  active: boolean
  toggleNotifications: () => void
}

const NTContainer = styled.button`
  ${flexCenter()};
  ${buttonStyles()};
  height: 40px;
  width: 40px;
  border-radius: 8px;
`

export default NotificationsToggle
