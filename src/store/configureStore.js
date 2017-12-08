import {createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducers";
import {loadState} from "./localStorage";

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleWare = applyMiddleware(

  thunk,
);



export default function configureStore(){
  return createStore(
    rootReducer,
    persistedState,
    composeEnhancers(middleWare)
  )
}
