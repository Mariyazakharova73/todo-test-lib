import { all } from 'redux-saga/effects';
import { usersWatcher } from './testSaga';

export function* rootWatcher(){
  yield all([usersWatcher()])
}
