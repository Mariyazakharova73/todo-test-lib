import { createStore, createEvent } from 'effector';
import { v1 } from 'uuid';
import { todolistId1, todolistId2 } from '../utils/utils';

export const $tasks = createStore({
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
});

interface ItemAdded {
  todolistId: string;
  text: string;
}

interface ItemRemoved {
  todolistId: string;
  taskId: string;
}

interface ItemChecked {
  todolistId: string;
  taskId: string;
  checked: boolean;
}

interface ItemEdited {
  todolistId: string;
  taskId: string;
  text: string;
}

export const cteateTask = createEvent<ItemAdded>();
export const removeTask = createEvent<ItemRemoved>();
export const changeChecked = createEvent<ItemChecked>();
export const editTask = createEvent<ItemEdited>();
export const addEmptyTask = createEvent<string>();

$tasks
  .on(cteateTask, (state, data: ItemAdded) => {
    const stateCopy = { ...state };
    const newTask = { id: v1(), completed: false, text: data.text };
    const selectedTasks = stateCopy[data.todolistId];
    const newTasks = [...selectedTasks, newTask];
    stateCopy[data.todolistId] = newTasks;
    return { ...stateCopy };
  })
  .on(removeTask, (state, data: ItemRemoved) => {
    const stateCopy = { ...state };
    const selectedTasks = stateCopy[data.todolistId];
    const filteredTasks = selectedTasks.filter((item) => item.id !== data.taskId);
    stateCopy[data.todolistId] = filteredTasks;
    return { ...stateCopy };
  })
  .on(changeChecked, (state, data: ItemChecked) => {
    const stateCopy = { ...state };
    const editedTasks = stateCopy[data.todolistId].map((item) => {
      if (item.id === data.taskId) {
        return {
          ...item,
          completed: !data.checked,
        };
      } else {
        return item;
      }
    });
    stateCopy[data.todolistId] = editedTasks;
    return { ...stateCopy };
  })
  .on(editTask, (state, data: ItemEdited) => {
    const stateCopy = { ...state };
    const selectedTasks = stateCopy[data.todolistId];
    const editedTasksArr = selectedTasks.map((item) => {
      if (item.id === data.taskId) {
        return { ...item, text: data.text };
      }
      return item;
    });
    stateCopy[data.todolistId] = editedTasksArr;
    return { ...stateCopy };
  })
  .on(addEmptyTask, (state, todolistId: string) => {
    const stateCopy = { ...state };
    stateCopy[todolistId] = [];
    return { ...stateCopy };
  });
