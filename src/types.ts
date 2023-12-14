export interface IListItem {
  id: string;
  text: string;
  completed: boolean;
}

export enum FilterData {
  ALL = 'Все',
  ONLY_COMPLETED = 'Только выполенные',
  ONLY_UNCOMPLETED = 'Только не выполенные',
}

export interface TaskState {
  [key: string]: IListItem[]
}

export interface TodoList {
  id: string;
  title: string;
  filter: string;
}