
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import contractors from './reducers/contractors';
import contractor from './reducers/contractor';
import auth from './reducers/auth';
import manage from './reducers/manage';

export function initStore() {
  const reducers = combineReducers({
    contractors,
    contractor,
    auth,
    manage
  });
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

  return store;
}