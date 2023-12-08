import React, { useState } from 'react';
import './App.css';
import { FilterData, IListItem, TaskState } from './types';
import { v1 } from 'uuid';
import Form from './components/Form/Form';
import TodoList from './components/Todo/TodoList';

const dataForFilter = ['Все', 'Только выполенные', 'Только не выполенные'];

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [tasksObj, setTasks] = useState<TaskState>({
    [todolistId1]: [
      { text: 'Задача1', completed: true, id: v1() },
      { text: 'Задача2', completed: false, id: v1() },
      { text: 'Задача3', completed: true, id: v1() },
    ],
    [todolistId2]: [
      { text: 'Задача1', completed: true, id: v1() },
      { text: 'Задача2', completed: false, id: v1() },
      { text: 'Задача3', completed: true, id: v1() },
    ],
  });

  const [todolists, setTodolists] = useState([
    { id: todolistId1, title: 'Первый', filter: '0' },
    { id: todolistId2, title: 'Второй', filter: '0' },
  ]);

  const addTask = (value: string, todolistId: string) => {
    const newTask = { id: v1(), text: value, completed: false };
    const tasks = tasksObj[todolistId];
    const newTasks = [...tasks, newTask];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  };

  const deleteTack = (id: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    const newTasks = tasks.filter((item) => item.id !== id);
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  };

  const changeFilter = (value: string, todolistId: string) => {
    const todolist = todolists.find((item) => item.id === todolistId);
    if (todolist) {
      todolist.filter = value;
    }
    setTodolists([...todolists]);
  };

  const changeChecked = (id: string, checked: boolean, todolistId: string) => {
    const editedTasks = tasksObj[todolistId].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !checked,
        };
      } else {
        return item;
      }
    });
    tasksObj[todolistId] = editedTasks;
    setTasks({ ...tasksObj });
  };

  const addTodoList = (title: string) => {
    const todolist = {
      id: v1(),
      filter: '0',
      title,
    };
    setTodolists([todolist, ...todolists]);
    setTasks({ ...tasksObj, [todolist.id]: [] });
  };

  const deleteTodoList = (todolistId: string) => {
    const newTodolists = todolists.filter((t) => t.id !== todolistId);
    setTodolists(newTodolists);
  };

  const editTodoListTitle = (todolistId: string, text: string) => {
    // const newTodolists = todolists.map((item) => {
    //   if (item.id === todolistId) {
    //     console.log({ ...item, title: text })
    //     return { ...item, title: text };
    //   }
    //   return item;
    // });
    // setTodolists(newTodolists);
    const todoList = todolists.find((item) => {
      return item.id === todolistId;
    });

    if (todoList) {
      todoList.title = text;
    }
    setTodolists([...todolists]);
  };

  const editTask = (taskId: string, todolistId: string, text: string) => {
    let tasks = tasksObj[todolistId];
    const editedTasks = tasks.map((item) => {
      if (item.id === taskId) {
        return { ...item, text };
      }
      return item;
    });
    tasksObj[todolistId] = editedTasks;
    setTasks({ ...tasksObj });
    console.log(tasksObj);
  };

  return (
    <div className='App'>
      <div>
        <Form addItem={addTodoList} />
      </div>

      {todolists.map((todolist) => {
        let filteredTasks = tasksObj[todolist.id];

        switch (dataForFilter[Number(todolist.filter)]) {
          case FilterData.ONLY_COMPLETED:
            filteredTasks = tasksObj[todolist.id].filter((item) => {
              return item.completed;
            });
            break;
          case FilterData.ONLY_UNCOMPLETED:
            filteredTasks = tasksObj[todolist.id].filter((item) => {
              return !item.completed;
            });
            break;
          default:
            filteredTasks = tasksObj[todolist.id];
        }

        return (
          <TodoList
            deleteTodoList={deleteTodoList}
            key={todolist.id}
            todolistId={todolist.id}
            changeFilter={changeFilter}
            deleteTack={deleteTack}
            title={todolist.title}
            dataForFilter={dataForFilter}
            tasks={tasksObj[todolist.id]}
            filteredTasks={filteredTasks}
            changeChecked={changeChecked}
            addTask={addTask}
            editTask={editTask}
            editTodoListTitle={editTodoListTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
