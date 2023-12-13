import { makeAutoObservable } from 'mobx';
import { v1 } from 'uuid';
import { todolistId1, todolistId2 } from '../utils/utils';

class Tasks {
  tasks = {
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
  };
  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  cteateTask(todolistId: string, text: string) {
    const newTask = { id: v1(), completed: false, text };
    const selectedTAsksArray = this.tasks[todolistId];
    this.tasks[todolistId] = [...selectedTAsksArray, newTask];
    console.log(this.tasks[todolistId]);
  }

  removeTask(todolistId: string, taskId: string) {
    this.tasks[todolistId] = this.tasks[todolistId].filter((tl) => tl.id !== taskId);
  }
  changeChecked(todolistId: string, taskId: string, checked: boolean) {
    const selectedTask = this.tasks[todolistId].find((tl) => tl.id === taskId);
    if (selectedTask) {
      selectedTask.completed = !checked;
    }
  }
  editTask(todolistId: string, taskId: string, text: string) {
    const selectedTask = this.tasks[todolistId].find((task) => task.id === taskId);
    console.log(selectedTask);
    if (selectedTask) {
      console.log(text);
      selectedTask.text = text;
    }
  }
  addEmptyTask(todolistId: string) {
    this.tasks[todolistId] = [];
  }
}

export default new Tasks();
