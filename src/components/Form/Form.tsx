import React, { ChangeEvent, FC, useState } from 'react';
import s from './Form.module.css';

interface FormProps {
  addItem: (value: string) => void;
}

const Form: FC<FormProps> = ({ addItem }) => {
  const [inputValue, setInputValue] = useState('');

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = () => {
    addItem(inputValue);
    setInputValue('');
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
      <button className={s.button} onClick={onSubmit} disabled={inputValue.trim() === ''}>
        Сохранить
      </button>
    </form>
  );
};

export default Form;
