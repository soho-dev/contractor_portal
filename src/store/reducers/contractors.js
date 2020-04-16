
import { combineReducers } from 'redux';
import { isFetchingReducer } from './common';

const initContractorsReducer = () => {

  const items = (state = [], action) => {
    switch(action.type) {
      case 'FETCH_CONTRACTORS':
        return action.contractors;
      case 'CREATE_CONTRACTOR':
        return [...state, action.contractor];
      default:
        return state;
    }
  }

  const isFetching = isFetchingReducer('contractors');

  return combineReducers({
    items,
    isFetching
  })
}

const contractors = initContractorsReducer();
export default contractors;