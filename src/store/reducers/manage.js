import { combineReducers } from "redux"
import { createList } from './common';


const initManageReducer = () => {
  return combineReducers({
    contractors: createList('manage-contractors'),
    bookings: createList('manage-bookings'),
    receivedBookings: createList('received-bookings')
  })
}

const manage = initManageReducer();
export default manage;