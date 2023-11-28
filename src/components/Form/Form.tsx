import React, { ChangeEvent, FC } from 'react';
import { IListItem } from '../../types';
import s from './Form.module.css';

interface FormProps {
  addTask: (value: string, todolistId: string) => void;
  inputValue: string;
  setInput: (text: string) => void;
  selectedInput: IListItem | null;
  editTask: (value: string) => void;
  handleCancel: () => void;
  todolistId: string
}

const Form: FC<FormProps> = ({
  addTask,
  setInput,
  inputValue,
  selectedInput,
  editTask,
  handleCancel,
  todolistId
}) => {
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = () => {
    if (!selectedInput) {
      console.log(selectedInput);
      addTask(inputValue, todolistId);
    } else {
      editTask(inputValue);
    }

    setInput('');
  };

  const onClickEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <form className={s.form}>
      <input
        className={s.input}
        value={inputValue}
        onChange={changeInput}
        onKeyPress={() => onClickEnter}
      />
      <button className={s.button} onClick={onSubmit} disabled={inputValue === ''}>
        Сохранить
      </button>
      {selectedInput && (
        <button className={s.button} onClick={handleCancel}>
          Отмена
        </button>
      )}
    </form>
  );
};

export default Form;
