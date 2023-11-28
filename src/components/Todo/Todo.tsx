import React, { FC } from 'react';
import { IListItem } from '../../types';
import Filter from '../Filter/Filter';
import Form from '../Form/Form';
import List from '../List/List';
import s from './Todo.module.css';

export interface TodoProps {
  title: string;
  deleteTack: (id: string, todolistId: string) => void;
  addTask: (value: string, todolistId: string) => void;
  dataForFilter: string[];
  tasks: IListItem[];
  filteredTasks: IListItem[];
  getEditedTask: (data: IListItem) => void;
  setInput: (text: string) => void;
  changeChecked: (id: string, checked: boolean, todolistId: string) => void;
  changeFilter: (value: string, todolistId: string) => void;
  inputValue: string;
  selectedInput: IListItem | null;
  editTask: (value: string) => void;
  handleCancel: () => void;
  todolistId: string;
}

const Todo: FC<TodoProps> = ({
  title,
  deleteTack,
  dataForFilter,
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
  todolistId,
}) => {
  return (
    <div className={s.todo}>
      <h2 className={s.todoTitle}>{title}</h2>
      <Filter dataForFilter={dataForFilter} changeFilter={changeFilter} todolistId={todolistId} />
      <List
        filteredTasks={filteredTasks}
        setInput={setInput}
        deleteTack={deleteTack}
        getEditedTask={getEditedTask}
        changeChecked={changeChecked}
        todolistId={todolistId}
      />
      <Form
        todolistId={todolistId}
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
