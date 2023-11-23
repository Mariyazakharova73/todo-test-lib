import React, { FC } from 'react';
import ListItem from '../ListItem/ListItem';
import s from './List.module.css';
import { IListItem } from './../../types';

interface ListProps {
  data: IListItem[];
  deleteTack: (id: string) => void;
  getTaskData: (data: IListItem) => void;
  setInput: (text: string) => void;
}

const List: FC<ListProps> = ({ data, deleteTack, getTaskData, setInput }) => {
  return (
    <ul className={s.list}>
      {data.map((item: IListItem) => {
        return (
          <ListItem
          setInput={setInput}
            listItem={item}
            key={item.id}
            getTaskData={getTaskData}
            deleteTack={deleteTack}
          />
        );
      })}
    </ul>
  );
};

export default List;
