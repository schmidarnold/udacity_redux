import React from 'react';
import NavMenu from './NavMenu';
import Header from './Header';
import PostList from './PostList';
import CommentList from './CommentList'
import {Route,Switch} from 'react-router-dom'


function App()  {

    return (
      <div>
        <Header />
        <NavMenu />
        <Switch>
        <Route exact path="/" component={PostList}/>
        <Route exact path="/:category" component={PostList}/>

        <Route exact path="/:category/:postId" component={CommentList}/>

        </Switch>

      </div>


    );

}

export default App;
