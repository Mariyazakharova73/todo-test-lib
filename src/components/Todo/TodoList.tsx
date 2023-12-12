import React, { FC } from 'react';
import { useTasksStore } from '../../data/stores/tasksStore';
import { useTodolistStore } from '../../data/stores/todolistsStore';
import { IListItem } from '../../types';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import Filter from '../Filter/Filter';
import Form from '../Form/Form';
import List from '../List/List';
import s from './TodoList.module.css';

export interface TodoListProps {
  title: string;
  todolistId: string;
  filteredTasks: IListItem[] | [];
}

const TodoList: FC<TodoListProps> = ({ title, todolistId, filteredTasks }) => {
  
  const [cteateTask] = useTasksStore((state) => [state.cteateTask]);

  
  const addNewTask = (title: string) => {

    cteateTask(todolistId, title );
  };

  const [updateTodolist, removeTodolist] = useTodolistStore((state) => [state.updateTodolist, state.removeTodolist]);

  const changeTodolistTitle = (title: string) => {
    updateTodolist(todolistId, title);
  };

  const deleteTodolist = () => {
    removeTodolist(todolistId)
    }

  return (
    <div className={s.todo}>
      <>
        <h2 className={s.todoTitle}>
          <EditableSpan text={title} editItem={changeTodolistTitle}>
            {title}
          </EditableSpan>
          <button onClick={deleteTodolist}>X</button>
        </h2>
      </>
      <Filter todolistId={todolistId} />
      <List filteredTasks={filteredTasks} todolistId={todolistId} />
      <Form addItem={addNewTask} />
    </div>
  );
};

export default TodoList;
