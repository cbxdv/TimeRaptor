import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import PaletteIcon from '../assets/icons/Palette.svg'
import WithModal from '../hooks/WithModal'
import TextButton from './TextButton'
import { varietyColorStrings } from '../utils/strings'
import { varietyColors } from '../styles/styleConstants'
import { buttonStyles, flexCenter, inputBack } from '../styles/styleUtils'

const ColorPicker = ({ title = '', color, valueSetHandler }) => {
  const [showPickerPanel, setShowPickerPanel] = useState(false)
  return (
    <>
      {showPickerPanel && (
        <ColoPickerPanel
          color={color}
          mainSubmitHandler={valueSetHandler}
          closeHandler={() => setShowPickerPanel(false)}
        />
      )}
      <ColorPickerTopBox>
        <div className='box-info'>
          <ColorsIndicator color={color} />
          {varietyColorStrings[color] || title}
        </div>
        <PaletteIcon onClick={() => setShowPickerPanel(true)} />
      </ColorPickerTopBox>
    </>
  )
}

const ColoPickerPanel = ({ color, closeHandler, mainSubmitHandler }) => {
  const [selectedColor, setSelectedColor] = useState('')

  useEffect(() => {
    setSelectedColor(color)
  }, [])

  const submitHandler = () => {
    mainSubmitHandler(selectedColor)
    closeHandler()
  }

  const generateColorBlock = () => {
    let colors = Object.keys(varietyColorStrings)
    colors = colors.map(colorOption => (
      <ColorOptions
        key={colorOption}
        selected={selectedColor === colorOption}
        color={colorOption}
        onClick={() => setSelectedColor(colorOption)}
      />
    ))
    return colors
  }

  return (
    <WithModal modalTitle='Pick a Color' closeHandler={closeHandler}>
      <ColorText>{varietyColorStrings[selectedColor] || ''}</ColorText>
      <ColorPickerPanelContainer>
        <PickerContainer>{generateColorBlock()}</PickerContainer>
      </ColorPickerPanelContainer>
      <ButtonsContainer>
        <TextButton label='Discard' variant='danger' onClick={closeHandler} />
        <TextButton
          label='Submit'
          variant='success'
          onClick={() => submitHandler()}
        />
      </ButtonsContainer>
    </WithModal>
  )
}

const ColorPickerPanelContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  background-color: ${({ theme }) => theme.shade1};
  border-radius: 8px;
  margin: 30px;
  overflow: scroll;
`

const PickerContainer = styled.div`
  padding: 10px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(5, 1fr);
`

const ColorOptions = styled.div`
  ${buttonStyles()};
  background: ${({ color }) => varietyColors[color]};
  height: 30px;
  width: 30px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  border: ${({ selected }) =>
    selected ? `3px solid #60D394` : `0.5px solid rgba(0, 0, 0, 0.2)`};
`

const ButtonsContainer = styled.div`
  ${flexCenter({ justifyContent: 'space-between' })};
  margin: 30px;
`

const ColorText = styled.div`
  font-family: Outfit;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  ${flexCenter()};
  margin-top: 30px;
`

const ColorPickerTopBox = styled.div`
  ${inputBack()};
  ${flexCenter({ justifyContent: 'space-between' })}

  .box-info {
    ${flexCenter()};
  }
`

const ColorsIndicator = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => varietyColors[color]};
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-right: 10px;
`

export default ColorPicker
