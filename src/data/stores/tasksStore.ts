import { v1 } from 'uuid';
import { create } from 'zustand';
import { Tasks } from '../../types';
import { todolistId1, todolistId2 } from '../../utils/utils';

export interface TasksStore {
  tasks: Tasks;
  cteateTask: (todolistId: string, text: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
}

export const useTasksStore = create<TasksStore>((set, get) => ({
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
    let selectedTasks = copyTasks[todolistId];
    const newTasks = [...selectedTasks, newTask];
    copyTasks[todolistId] = newTasks;
    set({ tasks: copyTasks });
  },
  removeTask: (todolistId: string, taskId: string) => {
    const { tasks } = get();
    const copyTasks = { ...tasks };
    let selectedTasks = copyTasks[todolistId];
    const filteredTasks = selectedTasks.filter((item) => item.id !== taskId);
    copyTasks[todolistId] = filteredTasks;
    set({ tasks: copyTasks });
  },
  changeChacked: (todolistId: string, taskId: string) => {
    const { tasks } = get();
    const copyTasks = { ...tasks };
    
    set({ tasks: copyTasks });
  },
}));
