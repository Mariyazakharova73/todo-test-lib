import { createStore, createEvent } from 'effector';
import { TodoList } from '../types';
import { todolistId1, todolistId2 } from '../utils/utils';

export const $todolists = createStore<TodoList[]>([
  { id: todolistId1, title: 'Первый', filter: '0' },
  { id: todolistId2, title: 'Второй', filter: '0' },
]);

interface ItemAdded {
  todolistId: string;
  title: string;
}

interface ItemFiltered {
  todolistId: string;
  filter: string;
}

export const cteateTodoList = createEvent<ItemAdded>();
export const updateTodolist = createEvent<ItemAdded>();
export const removeTodolist = createEvent<string>();
export const changeFilter = createEvent<ItemFiltered>();

$todolists
  .on(cteateTodoList, (state, data: ItemAdded) => {
    const newTodolist = {
      id: data.todolistId,
      filter: '0',
      title: data.title,
    };
    return [...state, newTodolist];
  })
  .on(updateTodolist, (state, data: ItemAdded) => {
    const newTodolists = state.map((item) => {
      return { ...item, title: item.id === data.todolistId ? data.title : item.title };
    });
    return newTodolists;
  })
  .on(removeTodolist, (state, todolistId) => state.filter((item) => item.id !== todolistId))
  .on(changeFilter, (state, data: ItemFiltered) => {
    const copyState = [...state];
    const todo = copyState.find((item) => item.id === data.todolistId);
    if (todo) {
      todo.filter = data.filter;
    }
    return [...copyState];
  });
