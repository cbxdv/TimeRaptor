import React from 'react'
import styled from 'styled-components'

import DoneIcon from '../assets/icons/Done.svg'

import { themeColors } from '../styles/styleConstants'
import { flexCenter, buttonStyles } from '../styles/styleUtils'

const CheckBox = ({ checked = true, onClick }) => {
    return (
        <CheckBoxContainer checked={checked} onClick={onClick}>
            { checked && <DoneIcon /> }
        </CheckBoxContainer>
    )
}

const CheckBoxContainer = styled.div`
    ${flexCenter()};
    ${buttonStyles()}
    height: 30px;
    width: 30px;
    background: ${props => props.checked ? themeColors.background : themeColors.shade1};
    border: 2px solid ${themeColors.accent};
    border-radius: 8px;
    cursor: pointer;

    & > svg {
        width: 18px;
        height: 18px;
        fill: ${themeColors.accent};
    }
`

export default CheckBox