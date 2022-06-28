import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import PaletteIcon from '../assets/icons/Palette.svg'
import WithModal from '../wrappers/WithModal'
import { varietyColorStrings } from '../utils/strings'
import { varietyColors } from '../styles/styleConstants'
import { buttonStyles, flexCenter, inputBack } from '../styles/styleUtils'

import { ColorStringTypes } from '../@types/TimeBlockInterfaces'

const ColorPicker: React.FC<ColorPickerProps> = ({ title, color, valueSetHandler }) => {
  const [showPickerPanel, setShowPickerPanel] = useState<boolean>(false)

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
          {varietyColorStrings(color) || title}
        </div>
        <PaletteIcon onClick={() => setShowPickerPanel(true)} />
      </ColorPickerTopBox>
    </>
  )
}

type ColorPickerProps = {
  title?: string
  color: ColorStringTypes
  valueSetHandler: (selectedColor: ColorStringTypes) => void
}

ColorPicker.defaultProps = {
  title: 'Pick a color'
}

const ColoPickerPanel: React.FC<ColoPickerPanelProps> = ({
  color,
  closeHandler,
  mainSubmitHandler
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorStringTypes>('decoPeach')

  useEffect(() => {
    setSelectedColor(color)
  }, [])

  const submitHandler = (close = () => {}) => {
    mainSubmitHandler(selectedColor)
    close()
  }

  const generateColorBlock = () => {
    const colors = Object.keys(varietyColors)
    const colorsElements = colors.map((colorOption: ColorStringTypes) => (
      <ColorOptions
        key={colorOption}
        selected={selectedColor === colorOption}
        color={colorOption}
        onClick={() => setSelectedColor(colorOption)}
      />
    ))
    return colorsElements
  }

  return (
    <WithModal
      modalTitle='Pick a Color'
      closeHandler={closeHandler}
      mainButtonProps={{ onClick: submitHandler }}
      bodyPadding='0 30px 30px 30px'
      scrollLockDisabled
    >
      <ColorText>{varietyColorStrings(selectedColor) || ''}</ColorText>
      <ColorPickerPanelContainer>
        <PickerContainer>{generateColorBlock()}</PickerContainer>
      </ColorPickerPanelContainer>
    </WithModal>
  )
}

type ColoPickerPanelProps = {
  color: ColorStringTypes
  closeHandler: () => void
  mainSubmitHandler: (selectedColor: ColorStringTypes) => void
}

const ColorPickerPanelContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  background-color: ${({ theme }) => theme.shade1};
  border-radius: 8px;
  overflow: scroll;
  margin: 30px 0;
`

const PickerContainer = styled.div`
  padding: 10px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(5, 1fr);
`

const ColorOptions = styled.div<ColorPropTypes>`
  ${buttonStyles()};
  background: ${({ color }) => varietyColors[color]};
  height: 30px;
  width: 30px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  border: ${({ selected }) => (selected ? `3px solid #60D394` : `0.5px solid rgba(0, 0, 0, 0.2)`)};
`

type ColorPropTypes = { selected: boolean; color: ColorStringTypes }

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

const ColorsIndicator = styled.div<{ color: ColorStringTypes }>`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => varietyColors[color]};
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-right: 10px;
`

export default ColorPicker
