import { create } from 'zustand';
import { TodoList } from '../../types';
import { todolistId1, todolistId2 } from '../../utils/utils';

export interface TodolistStore {
  todolists: TodoList[];
  cteateTodoList: (todolistId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
  removeTodolist: (todolistId: string) => void;
  changeFilter: (todolistId: string, filter: string) => void;
}

export const useTodolistStore = create<TodolistStore>((set, get) => ({
  todolists: [
    { id: todolistId1, title: 'Первый', filter: '0' },
    { id: todolistId2, title: 'Второй', filter: '0' },
  ],
  cteateTodoList: (todolistId: string, title: string) => {
    const { todolists } = get();
    const newTodolist = {
      id: todolistId,
      filter: '0',
      title,
    };
    set({ todolists: [...todolists, newTodolist] });
  },
  updateTodolist: (todolistId: string, title: string) => {
    const { todolists } = get();
    const newTodolists = todolists.map((item) => {
      return { ...item, title: item.id === todolistId ? title : item.title };
    });
    console.log(newTodolists, 'store');
    set({ todolists: newTodolists });
  },
  removeTodolist: (todolistId: string) => {
    const { todolists } = get();
    const filteredTodolists = todolists.filter((item) => item.id !== todolistId);
    set({ todolists: filteredTodolists });
  },
  changeFilter: (todolistId: string, filter: string) => {
    const { todolists } = get();
    const newTodolists = [...todolists];
    const todo = newTodolists.find((item) => item.id === todolistId);
    if (todo) {
      todo.filter = filter;
    }
    set({ todolists: newTodolists });
  },
}));
