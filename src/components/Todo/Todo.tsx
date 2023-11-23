import React, { useState } from 'react';
import { IListItem } from '../../types';
import Filter from '../Filter/Filter';
import Form from '../Form/Form';
import List from '../List/List';
import s from './Todo.module.css';

const initArr = [
  { text: 'Задача1', completed: true, id: '0' },
  { text: 'Задача2', completed: false, id: '1' },
  { text: 'Задача3', completed: true, id: '2' },
];

const Todo = () => {
  const [tasks, setTasks] = useState(initArr);

  const [filterData, setFilterData] = useState([
    'Все',
    'Только выполенные',
    'Только не выполенные',
  ]);

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

  const getTaskData = (data: IListItem) => {
    setSelectedInput(data);
  };

  const setInput = (text: string) => {
    setInputValue(text);
  };

  const filterTasks = (data: IListItem[]) => {
    setTasks(data);
  };

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

  const handleCancel = () => {
    setSelectedInput(null);
    setInputValue('');
  };

  return (
    <div className={s.todo}>
      <h2 className={s.todoTitle}>T</h2>
      <Filter filterData={filterData} filterTasks={filterTasks} tasks={tasks} />
      <List data={tasks} setInput={setInput} deleteTack={deleteTack} getTaskData={getTaskData} />
      <Form
        addTask={addTask}
        setInput={setInput}
        inputValue={inputValue}
        selectedInput={selectedInput}
        editTask={editTask}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Todo;
