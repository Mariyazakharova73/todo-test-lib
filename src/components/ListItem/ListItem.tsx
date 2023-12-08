import React, { ChangeEvent, ChangeEventHandler, FC, useState } from 'react';
import { IListItem } from '../../types';
import s from './ListItem.module.css';
import cn from 'classnames';

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

export interface EditableSpanProps {
  text: string;
  children: any;
  editItem: (title: string) => void;
}

export const EditableSpan: FC<EditableSpanProps> = ({ text, children, editItem }) => {
  const [editedTitleValue, setEditedTitleValue] = useState(text);
  const [editMode, setEditMode] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTitleValue(e.target.value);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };
  const activateViewMode = () => {
    setEditMode(false);
    editItem(editedTitleValue);
  };

  return editMode ? (
    <input value={editedTitleValue} onChange={handleTitleChange} onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}>{text}</span>
  );
};
