import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Logo from '../assets/Logo.png'
import { closeWindow, reloadWindow } from '../utils/electronUtils'
import { flexCenter } from '../styles/styleUtils'
import { selectPlatform } from '../redux/slices/appSlice'

const Header: React.FC<HeaderProps> = ({ title, headerBubble1, headerBubble2, actions }) => {
  const navigate = useNavigate()

  const platform = useSelector(selectPlatform)

  const keyBindHandler = (event: KeyboardEvent) => {
    if ((event.key === 'q' || event.key === 'Q') && event.ctrlKey) {
      closeWindow()
    }
    if ((event.key === 'r' || event.key === 'R') && event.ctrlKey) {
      reloadWindow()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyBindHandler)
    return () => {
      document.removeEventListener('keydown', keyBindHandler)
    }
  })

  return (
    <HeaderContainer platform={platform}>
      <div className='header-section'>
        <div onClick={() => navigate(-1)} role='button' style={{ cursor: 'pointer' }}>
          <img src={Logo} className='header-logo' alt='Time Raptor' />
        </div>
        <h3>{title}</h3>
      </div>
      <div className='header-section'>
        <div className='hb-cont'>{headerBubble1}</div>
        <div className='hb-cont'>{headerBubble2}</div>
      </div>
      <div className='header-section'>{actions}</div>
    </HeaderContainer>
  )
}

type HeaderProps = {
  title?: string
  headerBubble1?: React.ReactElement
  headerBubble2?: React.ReactElement
  actions?: React.ReactElement
}

Header.defaultProps = {
  title: 'Time Raptor',
  headerBubble1: null,
  headerBubble2: null,
  actions: null
}

const HeaderContainer = styled.div<{ platform: string }>`
  background-color: ${({ theme }) => theme.secondary};
  ${flexCenter({ justifyContent: 'space-between' })};
  padding: 20px 30px;
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 20px 20px;
  padding-right: ${({ platform }) => platform === 'win32' && '180px'};
  position: sticky;
  top: 0;
  z-index: 4;

  .header-logo {
    width: 45px;
    margin-right: 20px;
  }

  .hb-cont {
    margin-left: 20px;
  }

  .header-section {
    ${flexCenter()};
    margin: 0 20px;
  }
`

export default Header
