import React, { ChangeEvent, FC, FormEvent } from 'react';
import { IListItem } from '../../types';
import s from './Form.module.css';

interface FormProps {
  addTask: (value: string) => void;
  inputValue: string;
  setInput: (text: string) => void;
  selectedInput: IListItem | null;
  editTask: (value: string) => void;
  handleCancel: () => void;
}

const Form: FC<FormProps> = ({
  addTask,
  setInput,
  inputValue,
  selectedInput,
  editTask,
  handleCancel,
}) => {
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedInput) {
      console.log(selectedInput);
      addTask(inputValue);
    } else {
      editTask(inputValue);
    }

    setInput('');
  };

  return (
    <form className={s.form}>
      <input className={s.input} value={inputValue} onChange={changeInput} />
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
