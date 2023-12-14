import React, { FC } from 'react';
import { cteateTask } from '../../store/tasksStore';
import { removeTodolist, updateTodolist } from '../../store/todolistsStore';
import { IListItem } from '../../types';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import Filter from '../Filter/Filter';
import Form from '../Form/Form';
import List from '../List/List';
import s from './TodoList.module.css';

export interface TodoListProps {
  title: string;
  filteredTasks: IListItem[];
  todolistId: string;
}

const TodoList: FC<TodoListProps> = ({ title, filteredTasks, todolistId }) => {
  const addNewTask = (text: string) => {
    cteateTask({ todolistId, text });
  };

  const changeTodoListTitle = (title: string) => {
    updateTodolist({ todolistId, title });
  };

  const deleteTodoList = () => {
    removeTodolist(todolistId);
  };

  return (
    <div className={s.todo}>
      <>
        <h2 className={s.todoTitle}>
          <EditableSpan text={title} editItem={changeTodoListTitle}>
            {title}
          </EditableSpan>
          <button onClick={deleteTodoList}>X</button>
        </h2>
      </>
      <Filter todolistId={todolistId} />
      <List filteredTasks={filteredTasks} todolistId={todolistId} />
      <Form addItem={addNewTask} />
    </div>
  );
};

export default TodoList;
