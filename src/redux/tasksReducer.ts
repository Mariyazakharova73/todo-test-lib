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
      console.log(newTask)
      // const tasks = state.tasks[action.todolistId];
      // const newTasks = [...tasks, newTask];
      // state.tasks[action.todolistId] = newTasks;
      return state;
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
