import React from 'react';
import './App.css';
import { FilterData } from './types';
import Form from './components/Form/Form';
import TodoList from './components/Todo/TodoList';
import { useUnit } from 'effector-react';
import { $todolists, cteateTodoList } from './store/todolistsStore';
import { $tasks, addEmptyTask } from './store/tasksStore';
import { dataForFilter } from './utils/utils';
import { v1 } from 'uuid';

function App() {
  const todolists = useUnit($todolists);
  const tasks = useUnit($tasks);

  const addTodoList = (title: string) => {
    const todolistId = v1();
    cteateTodoList({ todolistId, title });
    addEmptyTask(todolistId);
  };

  return (
    <div className='App'>
      <div>
        <Form addItem={addTodoList} />
      </div>

      {todolists?.map((todolist) => {
        let filteredTasks = tasks[todolist.id];

        switch (dataForFilter[Number(todolist.filter)]) {
          case FilterData.ONLY_COMPLETED:
            filteredTasks = tasks[todolist.id].filter((item) => {
              return item.completed;
            });
            break;
          case FilterData.ONLY_UNCOMPLETED:
            filteredTasks = tasks[todolist.id].filter((item) => {
              return !item.completed;
            });
            break;
          default:
            filteredTasks = tasks[todolist.id];
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

export default App;
