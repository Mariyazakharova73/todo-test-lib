import React, { ChangeEvent, FC } from 'react';
import s from './Filter.module.css';

interface FilterProps {
  dataForFilter: string[];
  changeFilter: (value: string) => void;
}

const Filter: FC<FilterProps> = ({ dataForFilter, changeFilter }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    changeFilter(e.target.value);
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
