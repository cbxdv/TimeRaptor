import React from 'react'
import styled from 'styled-components'

import { inputBack, flexCenter } from '../styles/styleUtils'

const TextArea = ({ name, title, onChangeHandler, inputValue }) => (
  <Textarea>
    <textarea
      name={name}
      className='text-area'
      onChange={onChangeHandler}
      value={inputValue}
      autoComplete='false'
      autoCapitalize='false'
      required
    />
    <label htmlFor='name' className='input-label'>
      {title}
    </label>
  </Textarea>
)

const Textarea = styled.div`
  position: relative;

  .text-area {
    ${inputBack()};
    ${flexCenter({ justifyContent: 'flex-start' })};
    height: 100px;
    resize: none;
    padding: 10px;
  }

  .input-label {
    font-family: Outfit;
    font-size: 16px;
    font-weight: 600;
    position: absolute;
    left: 10px;
    top: 15px;
    pointer-events: none;
    transition: all 0.1s ease-in-out;
  }

  .text-area:active,
  .text-area:focus,
  .text-area:valid {
    & + .input-label {
      transform: translateY(-36px);
      font-size: 14px;
    }
  }
`

export default TextArea
