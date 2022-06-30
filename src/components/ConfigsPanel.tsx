import React, { useState } from 'react'
import styled from 'styled-components'

import WithModal from '../wrappers/WithModal'
import { flexCenter } from '../styles/styleUtils'
import {
  AboutTab,
  AppConfigsTab,
  DayPlannerConfigsTab,
  TimetableConfigsTab,
  TodosConfigsTab,
  WaterTrackerConfigsTab
} from './ConfigTabsComponents'

const UserConfigsPanel: React.FC<UserConfigsPanelProps> = ({ closeHandler }) => {
  const [currentTab, setCurrentTab] = useState<string>('app')

  const tabSwitch = (tabString: TabStringTypes) => {
    setCurrentTab(tabString)
  }

  const getTabContent = () => {
    switch (currentTab) {
      case 'about':
        return <AboutTab />
      case 'app':
        return <AppConfigsTab />
      case 'timetable':
        return <TimetableConfigsTab />
      case 'todos':
        return <TodosConfigsTab />
      case 'dayPlanner':
        return <DayPlannerConfigsTab />
      case 'waterTracker':
        return <WaterTrackerConfigsTab />
      default:
        return <div />
    }
  }

  return (
    <WithModal modalTitle='User Configurations' closeHandler={closeHandler}>
      <UserConfigsPanelContainer>
        <MainPanel>
          <TabsSwitcherContainer>
            <TabOptionContainer selected={currentTab === 'app'} onClick={() => tabSwitch('app')}>
              App
            </TabOptionContainer>
            <TabOptionContainer
              selected={currentTab === 'timetable'}
              onClick={() => tabSwitch('timetable')}
            >
              Timetable
            </TabOptionContainer>
            <TabOptionContainer
              selected={currentTab === 'todos'}
              onClick={() => tabSwitch('todos')}
            >
              Todos
            </TabOptionContainer>
            <TabOptionContainer
              selected={currentTab === 'dayPlanner'}
              onClick={() => tabSwitch('dayPlanner')}
            >
              Day Planner
            </TabOptionContainer>
            <TabOptionContainer
              selected={currentTab === 'waterTracker'}
              onClick={() => tabSwitch('waterTracker')}
            >
              Water Tracker
            </TabOptionContainer>
            <TabOptionContainer
              selected={currentTab === 'about'}
              onClick={() => tabSwitch('about')}
            >
              About
            </TabOptionContainer>
          </TabsSwitcherContainer>
        </MainPanel>
        {getTabContent()}
      </UserConfigsPanelContainer>
    </WithModal>
  )
}

type UserConfigsPanelProps = {
  closeHandler: () => void
}

type TabStringTypes = 'app' | 'timetable' | 'todos' | 'dayPlanner' | 'waterTracker' | 'about'

const UserConfigsPanelContainer = styled.div`
  padding: 30px;
`

const MainPanel = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  margin-bottom: 30px;
`

const TabsSwitcherContainer = styled.div`
  ${flexCenter({ flexDirection: 'row' })}
  width: 100%;
  overflow-x: scroll;
`

const TabOptionContainer = styled.div<{ selected: boolean }>`
  ${flexCenter()};
  margin: 0 10px;
  cursor: pointer;
  border-bottom: 2px solid ${({ selected }) => (selected ? 'white' : 'transparent')};
  color: ${({ theme, selected }) => (selected ? theme.text : 'grey')};
  padding-bottom: 5px;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`

export default UserConfigsPanel
