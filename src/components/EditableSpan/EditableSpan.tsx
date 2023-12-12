import { ChangeEvent, FC, useState } from 'react';

export interface EditableSpanProps {
  text: string;
  children: any;
  editItem: (title: string) => void;
}

export const EditableSpan: FC<EditableSpanProps> = ({ text, editItem }) => {
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