import * as types from './actionTypes'
import serverApi from '../api/ServerApi';



export function loadCategoriesSuccess(categories){
  return{
    type: types.LOAD_CATEGORY_SUCCESS,
    categories
  };
}

export function loadCategories(){
  return function(dispatch){
    return serverApi.getAllCategories().then(
      categories =>{
        dispatch(loadCategoriesSuccess(categories))
      }).catch(error=>{
        throw(error);
      });

  };
}
