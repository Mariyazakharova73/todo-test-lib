import React from 'react';
import './App.css';
import { FilterData, IListItem } from './types';
import Form from './components/Form/Form';
import TodoList from './components/Todo/TodoList';
import { dataForFilter } from './utils/constants';
import { useTypedSelector } from './hooks/useTypedSelector';
import { selectTodolists, addTodolist } from './redux/todosReducer';
import { selectTasks } from './redux/tasksReducer';
import { useAppDispatch } from './hooks/useAppDispatch';

function App() {
  const todolists = useTypedSelector(selectTodolists);
  const tasks = useTypedSelector(selectTasks);
  const dispatch = useAppDispatch();

  const addNewTodolist = (title: string) => {
    dispatch(addTodolist(title));
  };

  return (
    <div className='App'>
      <div>
        <Form addItem={addNewTodolist} />
      </div>

      {todolists?.map((todolist) => {
        let filteredTasks = tasks[todolist.id];

        switch (dataForFilter[Number(todolist.filter)]) {
          case FilterData.ONLY_COMPLETED:
            filteredTasks = tasks[todolist.id].filter((item: IListItem) => {
              return item.completed;
            });
            break;
          case FilterData.ONLY_UNCOMPLETED:
            filteredTasks = tasks[todolist.id].filter((item: IListItem) => {
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
            dataForFilter={dataForFilter}
            tasks={tasks[todolist.id]}
            filteredTasks={filteredTasks}
          />
        );
      })}
    </div>
  );
}

export default App;
