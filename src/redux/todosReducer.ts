import { v1 } from 'uuid';
import { RootState } from '.';
import { Todos } from '../types';
import { todolistId1, todolistId2 } from '../utils/constants';
import { TodoListsAction, todolistsActionTypes } from './types';

export interface TodosState {
  todolists: Todos[];
}

const initialState: TodosState = {
  todolists: [
    { id: todolistId1, title: 'Первый', filter: '0' },
    { id: todolistId2, title: 'Второй', filter: '0' },
  ],
};

export const todosReducer = (state = initialState, action: TodoListsAction) => {
  switch (action.type) {
    case todolistsActionTypes.ADD_TODOLIST:
      const todolist = {
        id: v1(),
        filter: '0',
        title: action.payload,
      };
      return { ...state, todolists: [...state.todolists, todolist] };
    case todolistsActionTypes.REMOVE_TODOLIST:
      return {
        ...state,
        todolists: state.todolists.filter((item) => item.id !== action.payload),
      };
    case todolistsActionTypes.EDIT_TODOLIST_TLTLE:
      return {
        ...state,
        todolists: state.todolists.map((item) => {
          if (item.id === action.todolistId) {
            return { ...item, title: action.title };
          }
          return item;
        }),
      };
    case todolistsActionTypes.CHANGE_FILTER:
      const todo = state.todolists?.find((item) => item.id === action.todolistId);
      if (todo) {
        todo.filter = action.value;
      }
      return { ...state, todolists: [...state.todolists] };
    default:
      return state;
  }
};

export const selectTodolists = (state: RootState) => state.todolists.todolists;

export function addTodolist(title: string) {
  return {
    type: todolistsActionTypes.ADD_TODOLIST,
    payload: title,
  };
}

export function removeTodolist(id: string) {
  return {
    type: todolistsActionTypes.REMOVE_TODOLIST,
    payload: id,
  };
}

export function editTodolistTitle(todolistId: string, title: string) {
  return {
    type: todolistsActionTypes.EDIT_TODOLIST_TLTLE,
    todolistId,
    title,
  };
}

export function changeFilter(todolistId: string, value: string) {
  return {
    type: todolistsActionTypes.CHANGE_FILTER,
    todolistId,
    value,
  };
}
