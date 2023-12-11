import React, { ChangeEvent, FC } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { changeFilter } from '../../redux/todosReducer';
import s from './Filter.module.css';

interface FilterProps {
  dataForFilter: string[];
  todolistId: string;
}

const Filter: FC<FilterProps> = ({ dataForFilter, todolistId }) => {
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeFilter(todolistId, e.target.value));
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
