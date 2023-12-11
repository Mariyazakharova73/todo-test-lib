export enum todolistsActionTypes {
  ADD_TODOLIST = 'ADD_TODOLIST',
  REMOVE_TODOLIST = 'REMOVE_TODOLIST',
  EDIT_TODOLIST_TLTLE = 'EDIT_TODOLIST_TLTLE',
}

export interface addItemAction {
  type: todolistsActionTypes.ADD_TODOLIST;
  payload: string;
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

export type TodoListsAction = addItemAction | removeItemAction | editTodoListTitleAction;


export enum tasksActionTypes {
  ADD_TASK = 'ADD_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
  EDIT_TASK = 'EDIT_TASK',
  CHANGE_FILTER = 'CHANGE_FILTER',
  CHANGE_CHECKED = 'CHANGE_CHECKED',
}

export interface addTaskAction {
  type: tasksActionTypes.ADD_TASK,
  todolistId: string,
  text: string,
}

export type TasksAction = addTaskAction;
