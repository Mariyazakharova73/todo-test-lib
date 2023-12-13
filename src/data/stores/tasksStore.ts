import { v1 } from 'uuid';
import { create } from 'zustand';
import { Tasks } from '../../types';
import { todolistId1, todolistId2 } from '../../utils/utils';
import { devtools } from 'zustand/middleware';

export interface TasksStore {
  tasks: Tasks;
  cteateTask: (todolistId: string, text: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
  changeChecked: (todolistId: string, taskId: string, checked: boolean) => void;
  editTask: (todolistId: string, taskId: string, text: string) => void;
  addEmptyTask: (todolistId: string) => void;
}


export const useTasksStore = create<TasksStore>(
  //@ts-ignore
  devtools((set, get) => ({
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
    cteateTask: (todolistId: string, text: string) => {
      const { tasks } = get();
      const copyTasks = { ...tasks };
      const newTask = { id: v1(), completed: false, text };
      const selectedTasks = copyTasks[todolistId];
      const newTasks = [...selectedTasks, newTask];
      copyTasks[todolistId] = newTasks;
      set({ tasks: copyTasks });
    },
    removeTask: (todolistId: string, taskId: string) => {
      const { tasks } = get();
      const copyTasks = { ...tasks };
      const selectedTasks = copyTasks[todolistId];
      const filteredTasks = selectedTasks.filter((item) => item.id !== taskId);
      copyTasks[todolistId] = filteredTasks;
      set({ tasks: copyTasks });
    },
    changeChecked: (todolistId: string, taskId: string, checked: boolean) => {
      const { tasks } = get();
      const copyTasks = { ...tasks };
      const editedTasks = copyTasks[todolistId].map((item) => {
        if (item.id === taskId) {
          return {
            ...item,
            completed: !checked,
          };
        } else {
          return item;
        }
      });
      copyTasks[todolistId] = editedTasks;

      set({ tasks: copyTasks });
    },
    editTask: (todolistId: string, taskId: string, text: string) => {
      const { tasks } = get();
      const copyTasks = { ...tasks };
      const selectedTasks = copyTasks[todolistId];
      const editedTasksArr = selectedTasks.map((item) => {
        if (item.id === taskId) {
          return { ...item, text: text };
        }
        return item;
      });
      copyTasks[todolistId] = editedTasksArr;
      set({ tasks: copyTasks });
    },
    addEmptyTask: (todolistId: string) => {
      const { tasks } = get();
      const copyTasks = { ...tasks };
      copyTasks[todolistId] = [];
      set({ tasks: copyTasks });
    },
  }))
);
