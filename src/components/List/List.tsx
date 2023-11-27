import React, { FC } from 'react';
import ListItem from '../ListItem/ListItem';
import s from './List.module.css';
import { IListItem } from './../../types';

interface ListProps {
  filteredTasks: IListItem[];
  deleteTack: (id: string) => void;
  getEditedTask: (data: IListItem) => void;
  setInput: (text: string) => void;
  changeChecked: any;
}

const List: FC<ListProps> = ({
  filteredTasks,
  deleteTack,
  getEditedTask,
  setInput,
  changeChecked,
}) => {
  return (
    <ul className={s.list}>
      {filteredTasks.map((item: IListItem) => {
        return (
          <ListItem
            changeChecked={changeChecked}
            setInput={setInput}
            listItem={item}
            key={item.id}
            getEditedTask={getEditedTask}
            deleteTack={deleteTack}
          />
        );
      })}
    </ul>
  );
};

export default List;
