import { v1 } from 'uuid';
import { RootState } from '.';
import { Tasks } from '../types';
import { todolistId1, todolistId2 } from '../utils/constants';
import { TasksAction, tasksActionTypes } from './types';

export interface TasksState {
  tasks: Tasks;
}

const initialState: TasksState = {
  tasks: {
    [todolistId1]: [
      { text: 'Задача1', completed: true, id: v1() },
      { text: 'Задача2', completed: false, id: v1() },
      { text: 'Задача3', completed: true, id: v1() },
    ],
    [todolistId2]: [
      { text: 'Задача1', completed: true, id: v1() },
      { text: 'Задача2', completed: false, id: v1() },
      { text: 'Задача3', completed: true, id: v1() },
    ],
  },
};

export const tasksReducer = (state = initialState, action: TasksAction) => {
  switch (action.type) {
    case tasksActionTypes.ADD_TASK:
      const newTask = { id: v1(), text: action.text, completed: false };
      let selectedTasks = state.tasks[action.todolistId];
      const newTasks = [...selectedTasks, newTask];
      state.tasks[action.todolistId] = newTasks;
      return { ...state, tasks: { ...state.tasks } };
    case tasksActionTypes.REMOVE_TASK:
      let tasks = state.tasks[action.todolistId];
      const filterdTasks = tasks.filter((item) => item.id !== action.taskId);
      state.tasks[action.todolistId] = filterdTasks;
      return { ...state, tasks: { ...state.tasks } };
    case tasksActionTypes.CHANGE_CHECKED:
      const editedTasks = state.tasks[action.todolistId].map((item) => {
        if (item.id === action.taskId) {
          return {
            ...item,
            completed: !action.checked,
          };
        } else {
          return item;
        }
      });
      state.tasks[action.todolistId] = editedTasks;
      return { ...state, tasks: { ...state.tasks } };
    case tasksActionTypes.EDIT_TASK:
      let tasksArr = state.tasks[action.todolistId];
      const editedTasksArr = tasksArr.map((item) => {
        if (item.id === action.taskId) {
          return { ...item, text: action.text };
        }
        return item;
      });
      state.tasks[action.todolistId] = editedTasksArr;
      return { ...state, tasks: { ...state.tasks } };
    default:
      return state;
  }
};

export const selectTasks = (state: RootState) => state.tasks.tasks;

export function addTask(todolistId: string, text: string) {
  return {
    type: tasksActionTypes.ADD_TASK,
    todolistId,
    text,
  };
}

export function deleteTask(todolistId: string, taskId: string) {
  return {
    type: tasksActionTypes.REMOVE_TASK,
    todolistId,
    taskId,
  };
}

export function changeChecked(todolistId: string, taskId: string, checked: boolean) {
  return {
    type: tasksActionTypes.CHANGE_CHECKED,
    todolistId,
    taskId,
    checked,
  };
}

export function editTask(todolistId: string, taskId: string, text: string) {
  return {
    type: tasksActionTypes.EDIT_TASK,
    todolistId,
    taskId,
    text,
  };
}
