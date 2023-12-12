import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import { thunk } from 'redux-thunk';
import { tasksReducer } from './tasksReducer';
import { todosReducer } from './todosReducer';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './saga';

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  todolists: todosReducer,
  tasks: tasksReducer,
});

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const middlewares = [sagaMiddleware, thunk]

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware
  //@ts-ignore
  (sagaMiddleware, thunk)));

export type RootState = ReturnType<typeof rootReducer>;
// export type RootState = ReturnType<typeof store.getState>;

//watcher
sagaMiddleware.run(rootWatcher)
