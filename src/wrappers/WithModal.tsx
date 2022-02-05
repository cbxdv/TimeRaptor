import React, { useEffect, useRef, ReactNode } from 'react'
import styled from 'styled-components'

import TextButton from '../components/TextButton'
import CrossIcon from '../assets/icons/CrossIcon.svg'
import { flexCenter, buttonStyles } from '../styles/styleUtils'

const WithModal: React.FC<WithModalProps> = ({
  children,
  closeHandler,
  modalTitle,
  bodyPadding,
  mainButtonProps,
  secButtonProps,
  scrollLockDisabled
}) => {
  document.body.style.overflow = 'hidden'

  const ref = useRef(null)

  let timer: NodeJS.Timer

  const close = () => {
    ref.current.style.opacity = 0
    timer = setTimeout(() => {
      closeHandler()
    }, 150)
  }

  const keyBindHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close()
    }
  }

  useEffect(() => {
    ref.current.style.opacity = 1
    if (!scrollLockDisabled) {
      document.body.style.overflow = 'hidden'
    }
    document.addEventListener('keydown', keyBindHandler)
    return () => {
      if (!scrollLockDisabled) {
        document.body.style.overflow = 'unset'
      }
      document.removeEventListener('keydown', keyBindHandler)
      clearTimeout(timer)
    }
  }, [])

  return (
    <ModalContainer ref={ref}>
      <ModalDrop onClick={close} />
      <ModalBody>
        <ModalHeader>
          <h1>{modalTitle}</h1>
          <ModalCloseButton type='button' onClick={close}>
            <CrossIcon />
          </ModalCloseButton>
        </ModalHeader>
        <div style={bodyPadding ? { padding: bodyPadding } : {}}>
          {children}
          {mainButtonProps && (
            <ButtonsContainer>
              <TextButton
                label={(secButtonProps && secButtonProps.label) || 'Close'}
                variant='danger'
                onClick={(secButtonProps && secButtonProps.onClick) || close}
              />
              <TextButton
                label={mainButtonProps.label || 'Submit'}
                variant='success'
                onClick={() => {
                  mainButtonProps.onClick(close)
                }}
              />
            </ButtonsContainer>
          )}
        </div>
      </ModalBody>
    </ModalContainer>
  )
}

type WithModalProps = {
  children: ReactNode
  closeHandler: () => void
  modalTitle: string
  mainButtonProps?: {
    label?: string
    onClick: (close?: () => void) => void | null
  } | null
  secButtonProps?: {
    label: string
    onClick: () => void | null
  } | null
  bodyPadding?: string
  scrollLockDisabled?: boolean
}

WithModal.defaultProps = {
  mainButtonProps: null,
  secButtonProps: null,
  bodyPadding: '0',
  scrollLockDisabled: false
}

const ModalContainer = styled.div`
  ${flexCenter()};
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) =>
    theme.name === 'dark' ? `rgb(35, 35, 35, 0.5)` : `rgba(0, 0, 0, 0.5)`};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.1s linear;
`

const ModalBody = styled.div`
  max-width: 80%;
  max-height: 70vh;
  background: ${({ theme }) => theme.secondary};
  border-radius: 8px;
  z-index: 20;
  overflow: scroll;
  position: relative;
`

const ModalHeader = styled.div`
  ${flexCenter({ justifyContent: 'space-between' })};
  height: 50px;
  background-color: ${({ theme }) => theme.accent};
  color: ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.shade1)};
  border-radius: 8px;
  padding: 0 30px;
  position: sticky;
  top: 0;
  z-index: 1;

  h1 {
    font-family: Outfit;
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
  }

  .close-container {
    ${flexCenter()};
    cursor: pointer;

    &:active {
      transform: scale(0.9);
    }

    & > svg {
      fill: ${({ theme }) =>
        theme.name === 'dark' ? theme.text : theme.shade1};
    }
  }
`

const ModalCloseButton = styled.button`
  ${buttonStyles()};
  border: none;
  box-shadow: none;

  & > svg {
    fill: ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.shade1)};
  }
`

const ModalDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

const ButtonsContainer = styled.div`
  ${flexCenter({ justifyContent: 'space-between' })};
  min-width: 250px;
`

export default WithModal
