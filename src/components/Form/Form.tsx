import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import s from './Form.module.css';

export interface FormProps {
  addItem: (value: string) => void;
}

const Form: FC<FormProps> = ({ addItem }) => {
  const [inputValue, setInputValue] = useState('');

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem(inputValue);
    setInputValue('');
  };

  const handleCancel = () => {
    setInputValue('');
  };

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <input
        className={s.input}
        value={inputValue}
        onChange={changeInput}
        // onKeyPress={() => onClickEnter}
      />
      <button type='submit' className={s.button} disabled={inputValue.trim() === ''}>
        Сохранить
      </button>
    </form>
  );
};

export default Form;
