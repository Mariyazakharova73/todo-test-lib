export enum todolistsActionTypes {
  ADD_TODOLIST = 'ADD_TODOLIST',
  REMOVE_TODOLIST = 'REMOVE_TODOLIST',
  EDIT_TODOLIST_TLTLE = 'EDIT_TODOLIST_TLTLE',
  CHANGE_FILTER = 'CHANGE_FILTER',
}

export interface addItemAction {
  type: todolistsActionTypes.ADD_TODOLIST;
  todolistId: string;
  title: string;
}

export interface removeItemAction {
  type: todolistsActionTypes.REMOVE_TODOLIST;
  payload: string;
}

export interface editTodoListTitleAction {
  type: todolistsActionTypes.EDIT_TODOLIST_TLTLE;
  todolistId: string;
  title: string;
}

export interface changeFilterAction {
  type: todolistsActionTypes.CHANGE_FILTER;
  todolistId: string;
  value: string;
}

export type TodoListsAction =
  | addItemAction
  | removeItemAction
  | editTodoListTitleAction
  | changeFilterAction;

export enum tasksActionTypes {
  ADD_TASK = 'ADD_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
  EDIT_TASK = 'EDIT_TASK',
  CHANGE_CHECKED = 'CHANGE_CHECKED',
  ADD_EMPTY_TASKS = 'ADD_EMPTY_TASKS',
}

export interface addTaskAction {
  type: tasksActionTypes.ADD_TASK;
  todolistId: string;
  text: string;
}

export interface deleteTaskAction {
  type: tasksActionTypes.REMOVE_TASK;
  todolistId: string;
  taskId: string;
}

export interface changeCheckedAction {
  type: tasksActionTypes.CHANGE_CHECKED;
  todolistId: string;
  taskId: string;
  checked: boolean;
}

export interface editTaskAction {
  type: tasksActionTypes.EDIT_TASK;
  todolistId: string;
  taskId: string;
  text: string;
}

export interface addNewTodolistAction {
  type: tasksActionTypes.ADD_EMPTY_TASKS;
  todolistId: string;
}

export type TasksAction =
  | addTaskAction
  | deleteTaskAction
  | changeCheckedAction
  | editTaskAction
  | addNewTodolistAction;

