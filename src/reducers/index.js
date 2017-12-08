import {combineReducers} from 'redux';
import categories from './categoryReducer';
import posts from './postReducer'
import comments from './commentReducer'
import sortOrder from './sortReducer'

const rootReducer = combineReducers(
  {
    categories,
    posts,
    comments,
    sortOrder,
  }
)

export default rootReducer;
