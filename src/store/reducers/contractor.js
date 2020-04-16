import { combineReducers } from 'redux';
import { isFetchingReducer } from './common';

const initContractorReducer = () => {
  const item  = (state = {}, action) => {
    switch(action.type) {
      case 'UNMOUNT_CONTRACTOR':
        return {};
      case 'UPDATE_CONTRACTOR_SUCCESS':
      case 'FETCH_CONTRACTOR_BY_ID':
        return action.contractor;
      default:
        return state;
    }
  }

  const isFetching = isFetchingReducer('contractor');

  return combineReducers({
    item,
    isFetching
  });
}

const contractor = initContractorReducer();
export default contractor;