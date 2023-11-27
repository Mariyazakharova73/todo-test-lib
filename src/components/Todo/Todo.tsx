import React, { FC } from 'react';
import { IListItem } from '../../types';
import Filter from '../Filter/Filter';
import Form from '../Form/Form';
import List from '../List/List';
import s from './Todo.module.css';

export interface TodoProps {
  title: string;
  deleteTack: (id: string) => void;
  dataForFilter: string[];
  tasks: IListItem[];
  filteredTasks: IListItem[];
  getEditedTask: (data: IListItem) => void;
  setInput: (text: string) => void;
  changeChecked: any;
  addTask: (value: string) => void;
  changeFilter: (value: string) => void;
  inputValue: string;
  selectedInput: IListItem | null;
  editTask: (value: string) => void;
  handleCancel: () => void;
}

const Todo: FC<TodoProps> = ({
  title,
  deleteTack,
  dataForFilter,
  tasks,
  filteredTasks,
  setInput,
  getEditedTask,
  changeChecked,
  addTask,
  inputValue,
  selectedInput,
  handleCancel,
  editTask,
  changeFilter,
}) => {
  return (
    <div className={s.todo}>
      <h2 className={s.todoTitle}>{title}</h2>
      <Filter dataForFilter={dataForFilter} changeFilter={changeFilter} />
      <List
        filteredTasks={filteredTasks}
        setInput={setInput}
        deleteTack={deleteTack}
        getEditedTask={getEditedTask}
        changeChecked={changeChecked}
      />
      <Form
        addTask={addTask}
        setInput={setInput}
        inputValue={inputValue}
        selectedInput={selectedInput}
        editTask={editTask}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Todo;
