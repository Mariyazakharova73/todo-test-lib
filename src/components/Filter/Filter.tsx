import React, { FC } from 'react';
import { IListItem } from '../../types';
import s from './Filter.module.css';

interface FilterProps {
  filterData: string[];
  tasks: IListItem[];
  filterTasks: (data: IListItem[]) => void;
}

const Filter: FC<FilterProps> = ({ filterData, filterTasks, tasks }) => {
  const handleChange = (e: any) => {
    switch (filterData[e.target.value]) {
      case 'Только выполенные':
        const completedTasks = tasks.filter((item) => {
          return item.completed;
        });
        return filterTasks(completedTasks);
      case 'Только не выполенные':
        const unCompletedTasks = tasks.filter((item) => {
          return !item.completed;
        });
        return filterTasks(unCompletedTasks);
      default:
        return filterTasks([...tasks]);
    }
  };
  return (
    <div className={s.filter}>
      <select id='select' className={s.select} onChange={(e) => handleChange(e)}>
        {filterData.map((item, index) => (
          <option value={index}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
