import React, { FC } from 'react';
import ListItem from '../ListItem/ListItem';
import s from './List.module.css';
import { IListItem } from './../../types';

interface ListProps {
  filteredTasks: IListItem[];
  todolistId: string;
}

const List: FC<ListProps> = ({
  filteredTasks,
  todolistId,

}) => {
  return (
    <ul className={s.list}>
      {filteredTasks.map((item: IListItem) => { 
        return (
          <ListItem
            listItem={item}
            key={item.id}
            todolistId={todolistId}
          />
        );
      })}
    </ul>
  );
};

export default List;
