import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import configureStore from './store/configureStore';
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {loadCategories} from './actions/categoryActions';
import {loadPosts} from './actions/postActions';
import {saveState} from "./store/localStorage";
import 'semantic-ui-css/semantic.min.css';

const store = configureStore();
store.subscribe(()=>{
  saveState(store.getState());
});
store.dispatch(loadCategories());
store.dispatch(loadPosts());


ReactDOM.render(<BrowserRouter >
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
