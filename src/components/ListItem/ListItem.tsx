import React, { FC, useState } from 'react';
import { IListItem } from '../../types';
import s from './ListItem.module.css';
import cn from 'classnames';

interface ListItemProps {
  listItem: IListItem;
  deleteTack: (id: string, todolistId: string) => void;
  getEditedTask: (data: IListItem) => void;
  setInput: (text: string) => void;
  changeChecked: (id: string, checked: boolean, todolistId: string) => void;
  todolistId: string;
}

const ListItem: FC<ListItemProps> = ({
  listItem,
  deleteTack,
  getEditedTask,
  setInput,
  changeChecked,
  todolistId,
}) => {
  const { text, completed, id: taskId } = listItem;
  const [checked, setChecked] = useState(completed);

  const changeInput = () => {
    changeChecked(taskId, checked, todolistId);
    setChecked((prev) => !prev);
  };

  const editTask = () => {
    getEditedTask(listItem);
    setInput(text);
  };

  const onRemoveHandler = () => {
    deleteTack(taskId, todolistId);
  };

  return (
    <li className={s.listItem}>
      <input type='checkbox' checked={checked} onChange={changeInput} />
      <p className={cn(s.listItemText, { [s.completed]: checked })}>{text}</p>
      <button className={cn(s.button, s.editButton)} onClick={editTask} />
      <button className={cn(s.button, s.deleteButton)} onClick={onRemoveHandler} />
    </li>
  );
};

export default ListItem;
