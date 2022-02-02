import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import CalendarIcon from '../assets/icons/CalendarDayView.svg';
import WithModal from '../hooks/WithModal';
import TextButton from './TextButton';
import { dayStrings } from '../utils/strings';
import { flexCenter, inputBack } from '../styles/styleUtils';
import { DayStringTypes } from '../@types/DayAndTimeInterfaces';

const DayInput: React.FC<DayInputProps> = ({
  title,
  value,
  valueSetHandler
}) => {
  const [showPickerPanel, setShowPickerPanel] = useState<boolean>(false);

  return (
    <>
      {showPickerPanel && (
        <DayPickerPanel
          day={value}
          mainSubmitHandler={valueSetHandler}
          closeHandler={() => setShowPickerPanel(false)}
        />
      )}
      <DayPickerTopBox>
        {dayStrings[value] || title}
        <CalendarIcon onClick={() => setShowPickerPanel(true)} />
      </DayPickerTopBox>
    </>
  );
};

type DayInputProps = {
  title: string;
  value: DayStringTypes;
  valueSetHandler: (day: DayStringTypes) => void;
};

const DayPickerPanel: React.FC<DayPickerPanelProps> = ({
  day,
  closeHandler,
  mainSubmitHandler
}) => {
  const [selectedDay, setSelectedDay] = useState<DayStringTypes>('monday');

  const dayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedDay(day);

    setTimeout(() => {
      if (dayRef && dayRef.current) {
        dayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }, []);

  const submitHandler = () => {
    mainSubmitHandler(selectedDay);
    closeHandler();
  };

  const generateDayOptions = () => {
    const dayArr = Object.keys(dayStrings).map((d: DayStringTypes) => (
      <PickerOption
        selected={selectedDay === d}
        onClick={() => setSelectedDay(d)}
        key={`${d}-option`}
        ref={selectedDay === d ? dayRef : null}
      >
        {dayStrings[d]}
      </PickerOption>
    ));
    return dayArr;
  };

  return (
    <WithModal modalTitle='Pick a day' closeHandler={closeHandler}>
      <DayPickerPanelContainer>
        <OptionsContainer>{generateDayOptions()}</OptionsContainer>
      </DayPickerPanelContainer>
      <ButtonsContainer>
        <TextButton label='Discard' variant='danger' onClick={closeHandler} />
        <TextButton
          label='Submit'
          variant='success'
          onClick={() => submitHandler()}
        />
      </ButtonsContainer>
    </WithModal>
  );
};

type DayPickerPanelProps = {
  day: DayStringTypes;
  closeHandler: () => void;
  mainSubmitHandler: (day: DayStringTypes) => void;
};

const DayPickerTopBox = styled.div`
  ${inputBack()};
  ${flexCenter({ justifyContent: 'space-between' })};
`;

const DayPickerPanelContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  background-color: ${({ theme }) => theme.shade1};
  border-radius: 8px;
  margin: 30px;
`;

const OptionsContainer = styled.div`
  height: 200px;
  overflow: scroll;
  padding: 10px 0;
`;

const PickerOption = styled.div<{ selected?: boolean }>`
  background-color: ${({ theme }) => theme.secondary};
  border: 2px solid ${({ selected }) => (selected ? `#60D394` : `transparent`)};
  border-radius: 8px;
  ${flexCenter()}
  width: 200px;
  padding: 10px 30px;
  margin: 5px 0;
  height: max-content;
  font-family: Outfit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.shade2};
    color: ${({ theme }) => theme.text};
  }
`;

const ButtonsContainer = styled.div`
  ${flexCenter({ justifyContent: 'space-between' })};
  margin: 30px;
  min-width: 250px;
`;

export default DayInput;
