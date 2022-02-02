import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import DoneIcon from '../assets/icons/Done.svg';
import { flexCenter } from '../styles/styleUtils';

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onClick, animation }) => {
  const markRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => {
    if (animation) {
      if (checked) {
        markRef.current.classList.add('hide');
      } else {
        markRef.current.classList.remove('hide');
      }
      setTimeout(onClick, 150);
    } else {
      onClick();
    }
  };

  useEffect(() => {
    if (animation) {
      if (markRef && markRef.current) {
        if (checked) {
          markRef.current.classList.remove('hide');
        } else {
          markRef.current.classList.add('hide');
        }
      }
    }
  });

  return (
    <CheckBoxContainer onClick={toggle}>
      <CheckIconContainer ref={markRef}>
        <DoneIcon />
      </CheckIconContainer>
    </CheckBoxContainer>
  );
};

type CheckBoxProps = {
  checked?: boolean;
  onClick: () => void;
  animation?: boolean;
};

CheckBox.defaultProps = {
  checked: true,
  animation: true
};

const CheckBoxContainer = styled.div`
  ${flexCenter()};
  height: 30px;
  width: 30px;
  border: 2px solid
    ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.accent)};
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.1s linear;
  background: none;

  &:active {
    transform: scale(0.9);
  }
`;

const CheckIconContainer = styled.div`
  ${flexCenter()};

  & > svg {
    ${flexCenter()};
    fill: ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.accent)};
  }

  &::before {
    content: '';
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 0%;
    background: ${({ theme }) => theme.secondary};
    transition: width 0.1s linear, background 0.2s ease-out;
  }

  &.hide {
    &::before {
      width: 100%;
    }
  }
`;

export default CheckBox;
