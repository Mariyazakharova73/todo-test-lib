import React, { FC, useState } from 'react';
import { IListItem } from '../../types';
import s from './ListItem.module.css';
import cn from 'classnames';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { changeChecked, editTask, removeTask } from '../../store/tasksStore';

interface ListItemProps {
  listItem: IListItem;
  todolistId: string;
}

const ListItem: FC<ListItemProps> = ({ listItem, todolistId }) => {
  const { text, completed, id: taskId } = listItem;
  const [checked, setChecked] = useState(completed);

  const changeInput = () => {
    changeChecked({ todolistId, taskId, checked });
    setChecked((prev) => !prev);
  };

  const onRemoveHandler = () => {
    removeTask({ todolistId, taskId });
  };

  const editListItemTask = (text: string) => {
    editTask({ todolistId, taskId, text });
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
