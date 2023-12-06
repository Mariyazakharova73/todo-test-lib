import React, { ChangeEvent, ChangeEventHandler, FC, useState } from 'react';
import { IListItem } from '../../types';
import s from './ListItem.module.css';
import cn from 'classnames';

interface ListItemProps {
  listItem: IListItem;
  deleteTack: (id: string, todolistId: string) => void;
  changeChecked: (id: string, checked: boolean, todolistId: string) => void;
  todolistId: string;
}

const ListItem: FC<ListItemProps> = ({ listItem, deleteTack, changeChecked, todolistId }) => {
  const { text, completed, id: taskId } = listItem;
  const [checked, setChecked] = useState(completed);

  const changeInput = () => {
    changeChecked(taskId, checked, todolistId);
    setChecked((prev) => !prev);
  };

  const onRemoveHandler = () => {
    deleteTack(taskId, todolistId);
  };

  return (
    <>
      <li className={s.listItem}>
        <input type='checkbox' checked={checked} onChange={changeInput} />
        <div className={cn(s.listItemText, { [s.completed]: checked })}>
          <EditableSpan listItem={listItem}>{text}</EditableSpan>
        </div>
        <button className={cn(s.button, s.deleteButton)} onClick={onRemoveHandler} />
      </li>
    </>
  );
};

export default ListItem;

export interface EditableSpanProps {
  listItem: IListItem;
  children: any;
}

export const EditableSpan: FC<EditableSpanProps> = ({ listItem, children }) => {
  const [editTitleValue, setEditTitleValue] = useState(listItem.text);
  const [editable, setEditable] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTitleValue(e.target.value);
  };

  const handleTitleEdit = () => {
    setEditable(true);
  };
  const handleBlur = () => {
    setEditable(false);
  };

  if (editable) {
    return <input value={editTitleValue} onChange={handleTitleChange} onBlur={handleBlur} />;
  }
  return <span onDoubleClick={handleTitleEdit}>{listItem.text}</span>;
};
