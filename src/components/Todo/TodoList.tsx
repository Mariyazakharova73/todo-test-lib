import React, { FC } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addTask } from '../../redux/tasksReducer';
import { editTodolistTitle, removeTodolist } from '../../redux/todosReducer';
import { IListItem } from '../../types';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import Filter from '../Filter/Filter';
import Form from '../Form/Form';
import List from '../List/List';
import s from './TodoList.module.css';

export interface TodoListProps {
  title: string;
  dataForFilter: string[];
  tasks: IListItem[] | {};
  filteredTasks: IListItem[] | [];
  todolistId: string;
}

const TodoList: FC<TodoListProps> = ({ title, dataForFilter, filteredTasks, todolistId }) => {
  const dispatch = useAppDispatch();

  const addNewTask = (title: string) => {
    dispatch(addTask(todolistId, title));
  };

  const changeTodoListTitle = (title: string) => {
    dispatch(editTodolistTitle(todolistId, title));
  };

  const deleteTodoList = () => {
    dispatch(removeTodolist(todolistId));
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
      <Filter dataForFilter={dataForFilter} todolistId={todolistId} />
      <List filteredTasks={filteredTasks} todolistId={todolistId} />
      <Form addItem={addNewTask} />
    </div>
  );
};

export default TodoList;
