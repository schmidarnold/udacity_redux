import * as types from './actionTypes'




export function setSorting(sort){
  console.log("sortAction, sorting order: " + sort)
  return{
    type: types.CHANGE_SORT,
    sort
  };
}
