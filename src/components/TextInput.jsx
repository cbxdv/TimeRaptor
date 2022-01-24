import React from 'react'
import styled from 'styled-components'

import { inputBack } from '../styles/styleUtils'

const TextInput = ({ name, title, onChangeHandler, inputValue, error }) => (
  <Input error={error}>
    <input
      type='text'
      name={name}
      value={inputValue}
      onChange={onChangeHandler}
      autoComplete='false'
      autoCapitalize='false'
      className='input-box'
      spellCheck='false'
      required
    />
    <label htmlFor={name} className='input-label'>
      {title}
    </label>
  </Input>
)

const Input = styled.div`
  position: relative;

  .input-box {
    ${inputBack()};
    letter-spacing: 1px;
    border: 2px solid ${({ error }) => (error ? `#E24446` : `transparent`)};
  }

  .input-label {
    font-family: Outfit;
    font-size: 16px;
    font-weight: 600;
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
