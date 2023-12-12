import { put, takeEvery, call } from 'redux-saga/effects';

// возвращает промис
const fetchUsersFromApi = (): Promise<Response> =>
  fetch('https://jsonplaceholder.typicode.com/users?_limit=10');

function* fetchUsersWorker() {
  //@ts-ignore
  const data = yield call(fetchUsersFromApi);
  //@ts-ignore
  const json = yield call(() => new Promise((res) => res(data.json())));
  console.log(json);
  // Записаить в редакс
  // yield put(setUsers(json))
}

export const FETCH_USERS = 'FETCH_USERS';

export const fetchUsersAC = () => ({ type: FETCH_USERS });

// следит за action и запускает worker, когда action отрабатывает
export function* usersWatcher() {
  yield takeEvery(FETCH_USERS, fetchUsersWorker);
}
