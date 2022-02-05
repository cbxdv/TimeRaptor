import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

import { inputBack } from '../styles/styleUtils'

const TextInput: React.FC<TextInputProps> = ({
  name,
  title,
  onChangeHandler,
  inputValue,
  error,
  inputRef,
  animatedLabel,
  fullWidth
}) => (
  <Input error={error} fullWidth={fullWidth}>
    <input
      type='text'
      name={name}
      value={inputValue}
      onChange={onChangeHandler}
      autoComplete='false'
      autoCapitalize='false'
      className='input-box'
      spellCheck='false'
      ref={inputRef}
      placeholder={!animatedLabel ? title : null}
      required
    />
    {animatedLabel && (
      <label htmlFor={name} className='input-label'>
        {title}
      </label>
    )}
  </Input>
)

type TextInputProps = {
  name: string
  title: string
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  inputValue: string
  error: boolean
  inputRef?: React.Ref<HTMLInputElement> | null
  animatedLabel?: boolean
  fullWidth?: boolean
}

TextInput.defaultProps = {
  inputRef: null,
  animatedLabel: true,
  fullWidth: false
}

const Input = styled.div<{
  error: boolean
  fullWidth: boolean
}>`
  position: relative;

  .input-box {
    ${inputBack()};
    letter-spacing: 1px;
    border: 2px solid ${({ error }) => (error ? `#E24446` : `transparent`)};
    ${({ fullWidth }) => fullWidth && `width: 100%`};
  }

  .input-label {
    font-family: Outfit;
    font-size: 16px;
    font-weight: 500;
    position: absolute;
    left: 10px;
    top: 15px;
    pointer-events: none;
    transition: 0.1s ease-in-out;
    transition-property: transform, font-size, font-weight;
  }

  .input-box:active,
  .input-box:focus,
  .input-box:valid {
    & + .input-label {
      transform: translateY(-36px);
      font-size: 14px;
      font-weight: normal;
    }
  }
`

export default TextInput
