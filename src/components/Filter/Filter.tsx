import React, { ChangeEvent, FC } from 'react';
import { dataForFilter } from '../../utils/utils';
import s from './Filter.module.css';
import todo from '../../store/todolists'

interface FilterProps {
  todolistId: string;
}

const Filter: FC<FilterProps> = ({ todolistId }) => {
  
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    todo.changeFilter(todolistId, e.target.value);
  };

  return (
    <div className={s.filter}>
      <select id='select' className={s.select} onChange={(e) => handleChange(e)}>
        {dataForFilter.map((item, index) => (
          <option value={index} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
