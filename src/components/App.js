import React, { Component } from 'react';
import NavMenu from './NavMenu';
import Header from './Header';
import PostList from './PostList';
import CommentList from './CommentList'
import {Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <NavMenu />
        <Route exact path="/" component={PostList}/>
        <Route exact path="/:category" component={PostList}/>
        <Route exact path="/:postId/comments" component={CommentList}/>
        <Route exact path="/:category/:postId/comments" component={CommentList}/>
      </div>


    );
  }
}

export default App;
