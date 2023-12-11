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

export interface Tasks {
  [key: string]: IListItem[]
}

export interface Todos {
  id: string;
  title: string;
  filter: string;
}
