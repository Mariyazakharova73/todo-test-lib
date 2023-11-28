import React, { useState } from 'react';
import './App.css';
import Todo from './components/Todo/Todo';
import { FilterData, IListItem } from './types';
import { v1 } from 'uuid';

const dataForFilter = ['Все', 'Только выполенные', 'Только не выполенные'];

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [tasksObj, setTasks] = useState({
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

  const [inputValue, setInputValue] = useState('');
  const [selectedInput, setSelectedInput] = useState<IListItem | null>(null);

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

  const getEditedTask = (data: IListItem) => {
    setSelectedInput(data);
  };

  const setInput = (text: string) => {
    setInputValue(text);
  };

  const changeFilter = (value: string, todolistId: string) => {
    const todolist = todolists.find((item) => item.id === todolistId);
    if (todolist) {
      todolist.filter = value;
    }
    setTodolists([...todolists]);
  };

  const editTask = (value: string) => {
    // const editedTasks = tasks.map((item) => {
    //   if (item.id === selectedInput?.id) {
    //     return {
    //       ...item,
    //       text: value,
    //     };
    //   } else {
    //     return item;
    //   }
    // });
    // setTasks(editedTasks);
    // setSelectedInput(null);
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

  const handleCancel = () => {
    setSelectedInput(null);
    setInputValue('');
  };

  return (
    <div className='App'>
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
          <Todo
            todolistId={todolist.id}
            changeFilter={changeFilter}
            deleteTack={deleteTack}
            title={todolist.title}
            dataForFilter={dataForFilter}
            tasks={tasksObj[todolist.id]}
            filteredTasks={filteredTasks}
            setInput={setInput}
            getEditedTask={getEditedTask}
            changeChecked={changeChecked}
            addTask={addTask}
            inputValue={inputValue}
            selectedInput={selectedInput}
            editTask={editTask}
            handleCancel={handleCancel}
          />
        );
      })}
    </div>
  );
}

export default App;
