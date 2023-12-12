import { v1 } from 'uuid';

export const BASE_URL = 'https://jsonplaceholder.typicode.com/';
export const dataForFilter = ['Все', 'Только выполенные', 'Только не выполенные'];

export const todolistId1 = v1();
export const todolistId2 = v1();

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const request = (endpoint: RequestInfo | URL, options?: RequestInit) => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};
