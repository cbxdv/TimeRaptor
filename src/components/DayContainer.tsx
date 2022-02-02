import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import DayColumn from './DayColumn';
import { flexCenter } from '../styles/styleUtils';

import { IState } from '../@types/StateInterfaces';

const DayContainer = () => {
  const blocksStatus = useSelector((state: IState) => state.timetable.status);

  if (blocksStatus === 'loading') {
    return <>Loading...</>;
  }

  return (
    <DayContainerContainer>
      <DayColumnContainer>
        <DayColumn dayId='monday' />
      </DayColumnContainer>
      <DayColumnContainer>
        <DayColumn dayId='tuesday' />
      </DayColumnContainer>
      <DayColumnContainer>
        <DayColumn dayId='wednesday' />
      </DayColumnContainer>
      <DayColumnContainer>
        <DayColumn dayId='thursday' />
      </DayColumnContainer>
      <DayColumnContainer>
        <DayColumn dayId='friday' />
      </DayColumnContainer>
      <DayColumnContainer>
        <DayColumn dayId='saturday' />
      </DayColumnContainer>
      <DayColumnContainer rm>
        <DayColumn dayId='sunday' />
      </DayColumnContainer>
    </DayContainerContainer>
  );
};

const DayContainerContainer = styled.div`
  ${flexCenter()};
  height: 100%;
  width: 100%;
  border-radius: 8px;
`;

const DayColumnContainer = styled.div<{ rm?: boolean }>`
  margin-right: ${({ rm }) => (rm ? 0 : `5px`)};
  width: 100%;
  border-radius: 8px;
`;

export default DayContainer;
