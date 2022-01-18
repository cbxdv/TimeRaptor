import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import WithModal from '../hooks/WithModal.jsx'
import TextButton from './TextButton.jsx'

import PaletteIcon from '../assets/icons/Palette.svg'

import { themeColors, varietyColors } from '../styles/styleConstants.js'
import { flexCenter, inputBack, buttonStyles } from '../styles/styleUtils.js'

const ColorPicker = ({ title = '', color, valueSetHandler }) => {
  const [showPickerPanel, setShowPickerPanel] = useState(false)
  return (
    <React.Fragment>
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
          {colorNames[color] || title}
        </div>
        <div
          onClick={() => setShowPickerPanel(true)}
          style={{ cursor: 'pointer' }}
        >
          <PaletteIcon />
        </div>
      </ColorPickerTopBox>
    </React.Fragment>
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
    let colors = Object.keys(varietyColors)
    colors = colors.map((color) => (
      <ColorOptions
        key={color}
        selected={selectedColor === color}
        color={color}
        onClick={() => setSelectedColor(color)}
      />
    ))
    return colors
  }

  return (
    <WithModal modalTitle='Pick a Color' closeHandler={closeHandler}>
      <ColorText>{colorNames[selectedColor] || ''}</ColorText>
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

export const colorNames = {
  decoPeach: `Deco Peach`,
  deepChampagne: `Deep Champagne`,
  crayola: `Crayola`,
  teaGreen: `Tea Green`,
  celeste: `Celeste`,
  babyBlueEyes: `Baby Blue Eyes`,
  greyedLavender: `Greyed Lavender`,
  mauve: `Mauve`,
  linen: `Linen`,
  beige: `Beige`,
}

const ColorPickerPanelContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  background-color: ${themeColors.shade1};
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
  background: ${(props) => varietyColors[props.color]};
  height: 30px;
  width: 30px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  border: ${(props) =>
    props.selected
      ? `3px solid ${themeColors.accent}`
      : `0.5px solid rgba(0, 0, 0, 0.2)`};
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
  color: ${themeColors.accent};
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
  background-color: ${(props) => varietyColors[props.color]};
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-right: 10px;
`

export default ColorPicker
