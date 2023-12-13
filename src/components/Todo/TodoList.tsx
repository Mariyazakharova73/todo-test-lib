import React, { FC } from 'react';
import { IListItem } from '../../types';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import Filter from '../Filter/Filter';
import Form from '../Form/Form';
import List from '../List/List';
import s from './TodoList.module.css';
import todo from '../../store/todolists';
import taskStore from '../../store/tasks'

export interface TodoListProps {
  title: string;
  filteredTasks: IListItem[];
  todolistId: string;
}

const TodoList: FC<TodoListProps> = ({ title, filteredTasks, todolistId }) => {
  const addNewTask = (title: string) => {
    taskStore.cteateTask(todolistId, title)
  };

  const changeTodoListTitle = (title: string) => {
    todo.updateTodolist(todolistId, title);
  };

  const removeTodolist = () => {
    todo.removeTodolist(todolistId);
  };

  return (
    <div className={s.todo}>
      <>
        <h2 className={s.todoTitle}>
          <EditableSpan text={title} editItem={changeTodoListTitle}>
            {title}
          </EditableSpan>
          <button onClick={removeTodolist}>X</button>
        </h2>
      </>
      <Filter todolistId={todolistId} />
      <List filteredTasks={filteredTasks} todolistId={todolistId} />
      <Form addItem={addNewTask} />
    </div>
  );
};

export default TodoList;
