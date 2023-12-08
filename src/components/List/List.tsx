import React, { FC } from 'react';
import ListItem from '../ListItem/ListItem';
import s from './List.module.css';
import { IListItem } from './../../types';

interface ListProps {
  filteredTasks: IListItem[];
  deleteTack: (id: string, todolistId: string) => void;
  changeChecked: (id: string, checked: boolean, todolistId: string) => void;
  todolistId: string;
  editTask: (id: string, todolistId: string, title: string) => void;
}

const List: FC<ListProps> = ({
  filteredTasks,
  deleteTack,
  changeChecked,
  todolistId,
  editTask
}) => {
  return (
    <ul className={s.list}>
      {filteredTasks.map((item: IListItem) => {
        return (
          <ListItem
            changeChecked={changeChecked}
            listItem={item}
            key={item.id}
            deleteTack={deleteTack}
            todolistId={todolistId}
            editTask={editTask}
          />
        );
      })}
    </ul>
  );
};

export default List;
