import React, { useState } from 'react';
import './App.css';
import Todo from './components/Todo/Todo';
import { FilterData, IListItem } from './types';

const dataForFilter = ['Все', 'Только выполенные', 'Только не выполенные'];

function App() {
  const [tasks, setTasks] = useState([
    { text: 'Задача1', completed: true, id: '0' },
    { text: 'Задача2', completed: false, id: '1' },
    { text: 'Задача3', completed: true, id: '2' },
  ]);

  const [filter, setFilter] = useState('0');

  const [inputValue, setInputValue] = useState('');
  const [selectedInput, setSelectedInput] = useState<IListItem | null>(null);

  const addTask = (value: string) => {
    const uniq = 'id' + new Date().getTime();
    setTasks([...tasks, { id: uniq, text: value, completed: false }]);
  };

  const deleteTack = (id: string) => {
    const newTasks = tasks.filter((item) => item.id !== id);
    setTasks(newTasks);
  };

  const getEditedTask = (data: IListItem) => {
    setSelectedInput(data);
  };

  const setInput = (text: string) => {
    setInputValue(text);
  };

  const changeFilter = (value: string) => {
    setFilter(value);
  };

  let filteredTasks = tasks;

  switch (dataForFilter[Number(filter)]) {
    case FilterData.ONLY_COMPLETED:
      filteredTasks = tasks.filter((item) => {
        return item.completed;
      });
      break;
    case FilterData.ONLY_UNCOMPLETED:
      filteredTasks = tasks.filter((item) => {
        return !item.completed;
      });
      break;
    default:
      filteredTasks = tasks;
  }

  const editTask = (value: string) => {
    const editedTasks = tasks.map((item) => {
      if (item.id === selectedInput?.id) {
        return {
          ...item,
          text: value,
        };
      } else {
        return item;
      }
    });
    setTasks(editedTasks);
    setSelectedInput(null);
  };

  const changeChecked = (id: string, checked: boolean) => {
    const editedTasks = tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !checked,
        };
      } else {
        return item;
      }
    });
    console.log(editedTasks);
    setTasks([...editedTasks]);
  };

  const handleCancel = () => {
    setSelectedInput(null);
    setInputValue('');
  };

  return (
    <div className='App'>
      <Todo
        changeFilter={changeFilter}
        deleteTack={deleteTack}
        title='todo1'
        dataForFilter={dataForFilter}
        tasks={tasks}
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
    </div>
  );
}

export default App;
