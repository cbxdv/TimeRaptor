import React, { useEffect } from 'react'
import styled from 'styled-components'

import CrossIcon from '../assets/icons/CrossIcon.svg'

import { themeColors } from '../styles/styleConstants.js'
import { flexCenter } from '../styles/styleUtils'

const WithModal = ({ children, closeHandler, modalTitle }) => {

  document.body.style.overflow = 'hidden'
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'unset')
  }, [])

  return (
    <ModalContainer>
      <ModalDrop onClick={() => closeHandler()} />
      <ModalBody>
        <ModalHeader>
          <h1>{modalTitle}</h1>
          <div
            className='close-container'
            onClick={() => {
              closeHandler()
            }}
          >
            <CrossIcon />
          </div>
        </ModalHeader>
        <div>{children}</div>
      </ModalBody>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  ${flexCenter()};
`
const ModalBody = styled.div`
  max-width: 80%;
  max-height: 70vh;
  background: white;
  border-radius: 8px;
  z-index: 20;
  overflow: scroll;
  position: relative;
`
const ModalHeader = styled.div`
  height: 50px;
  background-color: ${themeColors.accent};
  color: ${themeColors.shade1};
  ${flexCenter({ justifyContent: 'space-between' })};
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
    cursor: pointer;
    ${flexCenter()};

    &:active {
      transform: scale(0.9);
    }

    & > svg {
      fill: ${themeColors.shade1};
    }
  }
`
const ModalDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

export default WithModal
