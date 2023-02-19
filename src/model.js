import { createEvent, createStore, createEffect } from "effector";

export const change = createEvent();
export const remove = createEvent();
export const insert = createEvent();
export const reset = createEvent();
export const toggle = createEvent();
const submit = createEvent()


// Вызвали в useEffect через useEvent
export const fetchTodosFx = createEffect((url) => fetch(url).then((req) => req.json()));

// начальное состояние - пустая строка
export const $input = createStore("")
  .on(change, (_, value) => value)
  .reset(reset, insert);

export const $todos = createStore([])
  .on(insert, (prev, next) => [...prev, {text: next, completed: false}])
  .on(fetchTodosFx.doneData, (state, result) => result)
  .on(remove, (state, id) => state.filter((item) => item.id !== id))
  .on(toggle, (state, id) => [
    ...state.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : { ...item }
    ),
  ])
  .on(insert, (state, newTodo) => [...state, newTodo]);

// после on заполенение store
