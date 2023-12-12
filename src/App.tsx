import React, { useEffect } from 'react';
import './App.css';
import { FilterData, IListItem, Todos } from './types';
import Form from './components/Form/Form';
import TodoList from './components/Todo/TodoList';
import { dataForFilter } from './utils/utils';
import { useTypedSelector } from './hooks/useTypedSelector';
import { selectTodolists, addTodolist, getDataThunk } from './redux/todosReducer';
import { addEmptyTasks, selectTasks } from './redux/tasksReducer';
import { useAppDispatch } from './hooks/useAppDispatch';
import { v1 } from 'uuid';
import { fetchUsersAC } from './redux/saga/testSaga';

function App() {
  const todolists = useTypedSelector(selectTodolists);
  const tasks = useTypedSelector(selectTasks);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    //dispatch(getDataThunk());
    dispatch(fetchUsersAC());
  }, []);

  const addNewTodolist = (title: string) => {
    const todolistId = v1();
    dispatch(addTodolist(todolistId, title));
    dispatch(addEmptyTasks(todolistId));
  };

  return (
    <div className='App'>
      <div>
        <Form addItem={addNewTodolist} />
      </div>

      {todolists?.map((todolist: Todos) => {
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
