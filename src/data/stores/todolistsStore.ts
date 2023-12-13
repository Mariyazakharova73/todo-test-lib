import { create, State, StateCreator } from 'zustand';
import { TodoList } from '../../types';
// import { todolistId1, todolistId2 } from '../../utils/utils';
import { devtools } from 'zustand/middleware';

export interface TodolistStore {
  todolists: TodoList[];
  cteateTodoList: (todolistId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
  removeTodolist: (todolistId: string) => void;
  changeFilter: (todolistId: string, filter: string) => void;
  fetch: () => void;
}

// проверить, существует ли стор
function isTodoStore(object: any): object is TodolistStore {
  return 'todolists' in object;
}

const localStorageUpdate =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState, ...args) => {
        if (isTodoStore(nextState)) {
          window.localStorage.setItem('todolists', JSON.stringify(nextState.todolists));
        }
        set(nextState, ...args);
      },
      get,
      api
    );

const currentState = JSON.parse(window.localStorage.getItem('todolists') || '[]') as TodoList[];

export const useTodolistStore = create<TodolistStore>(
  localStorageUpdate(
    // @ts-ignore
    devtools((set, get) => ({
      // todolists: [
      //   { id: todolistId1, title: 'Первый', filter: '0' },
      //   { id: todolistId2, title: 'Второй', filter: '0' },
      // ],
      todolists: currentState,
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
      fetch: async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=10');
        const json = await response.json();
        console.log(json);
        //set({ users: json })
      },
    }))
  )
);
