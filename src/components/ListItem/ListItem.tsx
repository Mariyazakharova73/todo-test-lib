import React, { FC, useState } from 'react';
import { IListItem } from '../../types';
import s from './ListItem.module.css';
import cn from 'classnames';
import { EditableSpan } from '../EditableSpan/EditableSpan';

interface ListItemProps {
  listItem: IListItem;
  deleteTack: (id: string, todolistId: string) => void;
  changeChecked: (id: string, checked: boolean, todolistId: string) => void;
  todolistId: string;
  editTask: (id: string, todolistId: string, title: string) => void;
}

const ListItem: FC<ListItemProps> = ({
  listItem,
  deleteTack,
  changeChecked,
  todolistId,
  editTask,
}) => {
  const { text, completed, id: taskId } = listItem;
  const [checked, setChecked] = useState(completed);

  const changeInput = () => {
    changeChecked(taskId, checked, todolistId);
    setChecked((prev) => !prev);
  };

  const onRemoveHandler = () => {
    deleteTack(taskId, todolistId);
  };

  const editListItemTask = (title: string) => {
    editTask(taskId, todolistId, title);
  };

  return (
    <>
      <li className={s.listItem}>
        <input type='checkbox' checked={checked} onChange={changeInput} />
        <div className={cn(s.listItemText, { [s.completed]: checked })}>
          <EditableSpan text={text} editItem={editListItemTask}>
            {text}
          </EditableSpan>
        </div>
        <button className={cn(s.button, s.deleteButton)} onClick={onRemoveHandler} />
      </li>
    </>
  );
};

export default ListItem;
