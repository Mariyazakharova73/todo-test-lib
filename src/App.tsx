import React from 'react';
import { v1 } from 'uuid';
import './App.css';
import Form from './components/Form/Form';
import TodoList from './components/Todo/TodoList';
import { useTasksStore } from './data/stores/tasksStore';
import { useTodolistStore } from './data/stores/todolistsStore';
import { FilterData } from './types';
import { dataForFilter } from './utils/utils';

function App() {
  const [todolists, createTodolist] = useTodolistStore((state) => [
    state.todolists,
    state.cteateTodoList,
  ]);
  const [tasks, addEmptyTask] = useTasksStore((state) => [state.tasks, state.addEmptyTask]);

  const addNewTodolist = (title: string) => {
    const todolistId = v1();
    createTodolist(todolistId, title);
    addEmptyTask(todolistId);
  };

  return (
    <div className='App'>
      <div>
        <Form addItem={addNewTodolist} />
      </div>

      {todolists.map((todolist) => {
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
