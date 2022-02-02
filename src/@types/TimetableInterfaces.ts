import { ITimeBlock } from './TimeBlockInterfaces';
import { ITimeObject } from './DayAndTimeInterfaces';

export interface IDayData {
  [key: string]: ITimeBlock[];
  monday: ITimeBlock[];
  tuesday: ITimeBlock[];
  wednesday: ITimeBlock[];
  thursday: ITimeBlock[];
  friday: ITimeBlock[];
  saturday: ITimeBlock[];
  sunday: ITimeBlock[];
}

export interface ICurrentBlock extends ITimeBlock {
  timeLeft?: ITimeObject;
}
