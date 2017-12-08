import * as types from '../actions/actionTypes';

export default function sortReducer(state="date",action){
  switch(action.type) {
    case types.CHANGE_SORT:
      return action.sort;
    default:
      return state;
  }
}
