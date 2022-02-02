import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import BinIcon from '../assets/icons/Bin.svg';
import EditIcon from '../assets/icons/Edit.svg';
import { buttonStyles, flexCenter } from '../styles/styleUtils';
import { getTimeString } from '../utils/timeUtils';

import { ITimeBlock } from '../@types/TimeBlockInterfaces';

const BlockTool: React.FC<BlockToolProps> = ({
  timeBlock,
  closeHandler,
  position,
  editHandler,
  deleteHandler
}) => {
  const { title, startTime, endTime, description } = timeBlock;
  const timeString = `${getTimeString(startTime)} - ${getTimeString(endTime)}`;

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      if (closeHandler) {
        closeHandler();
      }
    }
  };

  const keyBindHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeHandler();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('keydown', keyBindHandler);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', keyBindHandler);
    };
  });

  return (
    <BlockToolContainer ref={ref} position={position}>
      {position === 'right' && <PositionIndicator position={position} />}
      <TooltipTextContainer>
        <TooltipHeading>{title}</TooltipHeading>
        <TooltipDescription>{description || timeString}</TooltipDescription>
      </TooltipTextContainer>
      <ButtonsContainer>
        <IconButton onClick={editHandler}>
          <EditIcon />
        </IconButton>
        <IconButton danger onClick={deleteHandler}>
          <BinIcon />
        </IconButton>
      </ButtonsContainer>
      {position === 'left' && <PositionIndicator position={position} />}
    </BlockToolContainer>
  );
};

export type PositionTypes = 'left' | 'right';

type BlockToolProps = {
  timeBlock: ITimeBlock;
  closeHandler: () => void;
  position: PositionTypes;
  editHandler: () => void;
  deleteHandler: () => void;
};

const BlockToolContainer = styled.div<{ position: PositionTypes }>`
  ${flexCenter()};
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  position: absolute;
  z-index: 3;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.shade1)};
  right: ${({ position }) => position === 'left' && `110%`};
  left: ${({ position }) => position === 'right' && `110%`};
`;

const ButtonsContainer = styled.div`
  ${flexCenter()};
`;

const IconButton = styled.button<{ danger?: boolean }>`
  ${buttonStyles()};
  ${flexCenter()};
  border: 2px solid ${({ danger }) => (danger ? `#e24446` : `#2C9AFF`)};
  outline: none;
  border-radius: 10px;
  margin: 0 4px;
  height: 40px;
  width: 40px;

  & > svg {
    fill: ${({ danger }) => (danger ? `#e24446` : `#2C9AFF`)};
  }
`;

const PositionIndicator = styled.div<{ position: PositionTypes }>`
  width: 0;
  height: 0;
  position: absolute;
  ${({ position }) => position === 'right' && `right: 100%;`};
  ${({ position }) => position === 'left' && `left: 100%`};
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  ${({ theme, position }) =>
    position === 'right' && `border-right: 10px solid ${theme.accent}`};
  ${({ theme, position }) =>
    position === 'left' && `border-left: 10px solid ${theme.accent}`};
`;

const TooltipTextContainer = styled.div`
  margin-right: 20px;
  width: max-content;
`;

const TooltipHeading = styled.h1`
  height: 25px;
  font-family: Dongle;
  font-size: 24px;
  font-weight: bold;
`;

const TooltipDescription = styled.p`
  font-family: Dongle;
  font-size: 20px;
  font-weight: normal;
`;

export default BlockTool;
