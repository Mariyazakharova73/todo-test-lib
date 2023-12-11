import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import s from './Form.module.css';

export interface FormProps {
  addItem: (value: string) => any;
}

const Form: FC<FormProps> = ({ addItem }) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addItem(inputValue));
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
