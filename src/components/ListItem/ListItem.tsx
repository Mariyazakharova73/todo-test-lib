import React, { FC, useState } from 'react';
import { IListItem } from '../../types';
import s from './ListItem.module.css';
import cn from 'classnames';

interface ListItemProps {
  listItem: IListItem;
  deleteTack: (id: string) => void;
  getTaskData: (data: IListItem) => void;
  setInput: (text: string) => void;
}

const ListItem: FC<ListItemProps> = ({ listItem, deleteTack, getTaskData, setInput }) => {
  const { text, completed, id } = listItem;
  const [checked, setChecked] = useState(completed);

  const changeInput = () => {
    setChecked((prev) => !prev);
  };

  const editTask = () => {
    getTaskData(listItem);
    setInput(text);
  };

  return (
    <li className={s.listItem}>
      <input type='checkbox' checked={checked} onChange={changeInput} />
      <p className={cn(s.listItemText, { [s.completed]: checked })}>{text}</p>
      <button className={cn(s.button, s.editButton)} onClick={editTask} />
      <button className={cn(s.button, s.deleteButton)} onClick={() => deleteTack(id)} />
    </li>
  );
};

export default ListItem;
