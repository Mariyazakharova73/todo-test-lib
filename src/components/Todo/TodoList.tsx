import React, { FC } from 'react';
import { IListItem } from '../../types';
import Filter from '../Filter/Filter';
import Form from '../Form/Form';
import List from '../List/List';
import s from './TodoList.module.css';

export interface TodoListProps {
  title: string;
  deleteTack: (id: string, todolistId: string) => void;
  addTask: (value: string, todolistId: string) => void;
  dataForFilter: string[];
  tasks: IListItem[];
  filteredTasks: IListItem[];
  changeChecked: (id: string, checked: boolean, todolistId: string) => void;
  changeFilter: (value: string, todolistId: string) => void;
  todolistId: string;
  deleteTodoList: (todolistId: string) => void;
  editTask: (id: string, todolistId: string, title: string) => void;
}

const TodoList: FC<TodoListProps> = ({
  title,
  deleteTack,
  dataForFilter,
  filteredTasks,
  changeChecked,
  addTask,
  changeFilter,
  todolistId,
  deleteTodoList,
  editTask
}) => {
  const addNewTask = (title: string) => {
    addTask(title, todolistId);
  };

  return (
    <div className={s.todo}>
      <>
        <h2 className={s.todoTitle}>
          {title} <button onClick={() => deleteTodoList(todolistId)}>X</button>
        </h2>
      </>
      <Filter dataForFilter={dataForFilter} changeFilter={changeFilter} todolistId={todolistId} />
      <List
        filteredTasks={filteredTasks}
        deleteTack={deleteTack}
        changeChecked={changeChecked}
        todolistId={todolistId}
        editTask={editTask}
      />
      <Form addItem={addNewTask} />
    </div>
  );
};

export default TodoList;
