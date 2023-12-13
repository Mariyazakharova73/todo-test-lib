import React, { useEffect } from 'react';
import './App.css';
import { FilterData } from './types';
import Form from './components/Form/Form';
import TodoList from './components/Todo/TodoList';
import { dataForFilter, todolistId1 } from './utils/utils';
import { v1 } from 'uuid';
import { observer } from 'mobx-react-lite';
import todo from './store/todolists';
import taskStore from './store/tasks';

function App() {
  const addTodoList = (title: string) => {
    const todolistId = v1();
    todo.addTodolist(todolistId, title);
    taskStore.addEmptyTask(todolistId);
  };

  useEffect(() => {
    // todo.fetchUsers();
  }, []);

  return (
    <div className='App'>
      <div>
        <Form addItem={addTodoList} />
      </div>

      {todo.todolists?.map((todolist) => {
        let filteredTasks = taskStore.tasks[todolist.id];
        //console.log(filteredTasks)

        switch (dataForFilter[Number(todolist.filter)]) {
          case FilterData.ONLY_COMPLETED:
            filteredTasks = taskStore.tasks[todolist.id].filter((item) => {
              return item.completed;
            });
            break;
          case FilterData.ONLY_UNCOMPLETED:
            filteredTasks = taskStore.tasks[todolist.id].filter((item) => {
              return !item.completed;
            });
            break;
          default:
            filteredTasks = taskStore.tasks[todolist.id];
        }

        return (
          <TodoList
            key={todolist.id}
            todolistId={todolist.id}
            title={todolist.title}
            filteredTasks={filteredTasks}
          />
        );
      })}
    </div>
  );
}

export default observer(App);
