import React from 'react';
import './App.css';
import { FilterData } from './types';
import Form from './components/Form/Form';
import TodoList from './components/Todo/TodoList';
import { dataForFilter } from './utils/constants';
import { useTypedSelector } from './hooks/useTypedSelector';
import { selectTodolists, addTodolist } from './redux/todosReducer';
import { addTask, selectTasks } from './redux/tasksReducer';
import { useAppDispatch } from './hooks/useAppDispatch';

function App() {
  const todolists = useTypedSelector(selectTodolists);
  const tasks = useTypedSelector(selectTasks);
  const dispatch = useAppDispatch();

  const deleteTack = (id: string, todolistId: string) => {
    // let tasks = tasksObj[todolistId];
    // const newTasks = tasks.filter((item) => item.id !== id);
    // tasksObj[todolistId] = newTasks;
    // setTasks({ ...tasksObj });
  };

  const changeFilter = (value: string, todolistId: string) => {
    const todolist = todolists?.find((item) => item.id === todolistId);
    if (todolist) {
      todolist.filter = value;
    }
    // setTodolists([...todolists]);
  };

  const changeChecked = (id: string, checked: boolean, todolistId: string) => {
    // const editedTasks = tasksObj[todolistId].map((item) => {
    //   if (item.id === id) {
    //     return {
    //       ...item,
    //       completed: !checked,
    //     };
    //   } else {
    //     return item;
    //   }
    // });
    // tasksObj[todolistId] = editedTasks;
    // setTasks({ ...tasksObj });
  };

  const editTask = (taskId: string, todolistId: string, text: string) => {
    // let tasks = tasksObj[todolistId];
    // const editedTasks = tasks.map((item) => {
    //   if (item.id === taskId) {
    //     return { ...item, text };
    //   }
    //   return item;
    // });
    // tasksObj[todolistId] = editedTasks;
    // setTasks({ ...tasksObj });
    // console.log(tasksObj);
  };

  return (
    <div className='App'>
      <div>
        <Form addItem={addTodolist} />
      </div>

      {todolists?.map((todolist) => {
        // let filteredTasks = tasks[todolist.id];

        // switch (dataForFilter[Number(todolist.filter)]) {
        //   case FilterData.ONLY_COMPLETED:
        //     filteredTasks = tasks[todolist.id].filter((item) => {
        //       return item.completed;
        //     });
        //     break;
        //   case FilterData.ONLY_UNCOMPLETED:
        //     filteredTasks = tasks[todolist.id].filter((item) => {
        //       return !item.completed;
        //     });
        //     break;
        //   default:
        //     filteredTasks = tasks[todolist.id];
        // }

        return (
          <TodoList
            key={todolist.id}
            todolistId={todolist.id}
            changeFilter={changeFilter}
            deleteTack={deleteTack}
            title={todolist.title}
            dataForFilter={dataForFilter}
            // tasks={tasksObj[todolist.id]}
            tasks={{}}
            // filteredTasks={filteredTasks}
            filteredTasks={[]}
            changeChecked={changeChecked}
            editTask={editTask}
          />
        );
      })}
    </div>
  );
}

export default App;
