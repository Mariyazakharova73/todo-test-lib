import React, { FC } from 'react';
import ListItem from '../ListItem/ListItem';
import s from './List.module.css';
import { IListItem } from './../../types';

interface ListProps {
  filteredTasks: IListItem[];
  deleteTack: (id: string, todolistId: string) => void;
  getEditedTask: (data: IListItem) => void;
  setInput: (text: string) => void;
  changeChecked: (id: string, checked: boolean, todolistId: string) => void;
  todolistId: string;
}

const List: FC<ListProps> = ({
  filteredTasks,
  deleteTack,
  getEditedTask,
  setInput,
  changeChecked,
  todolistId
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
            todolistId={todolistId}
          />
        );
      })}
    </ul>
  );
};

export default List;
