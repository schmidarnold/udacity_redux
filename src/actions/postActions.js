import * as types from './actionTypes'
import serverApi from '../api/ServerApi';



export function loadPostsSuccess(posts){
  return{
    type: types.LOAD_POST_SUCCESS,
    posts
  };
}
export function addPost(post){
  console.log ("action addPost " + JSON.stringify(post));
  return{

    type: types.ADD_POST,
    post
  }
}
export function updatePost(post){
  console.log ("action editPost " + JSON.stringify(post));
  return{
    type: types.UPDATE_POST,
    post
  }
}
export function deletePost(postId){
  console.log ("action deletePost " + JSON.stringify(postId));
  return {
    type: types.DELETE_POST,
    id: postId
  }
}
export function upVotePost(postId){
  console.log ("action upVotePost " + JSON.stringify(postId));
  return {
    type: types.UP_VOTE_POST,
    id: postId
  }
}
export function downVotePost(postId){
  console.log ("action downVotePost " + JSON.stringify(postId));
  return {
    type: types.DOWN_VOTE_POST,
    id: postId
  }
}
export function loadPosts(){
  return function(dispatch){
    return serverApi.getAllPosts().then(
      posts =>{
        dispatch(loadPostsSuccess(posts))
      }).catch(error=>{
        throw(error);
      });

  };
}
export function addPostApi(post){
  return function(dispatch){
    return serverApi.postNewPost(post).then(
      post=>{

          dispatch(addPost(post))


      }).catch(error=>{
        throw(error);
      });
  };
}
export function editPostApi(post){
  return function(dispatch){
    return serverApi.putEditPost(post).then(
      post=>{

          dispatch(updatePost(post))


      }).catch(error=>{
        throw(error);
      });
  };
}
export function deletePostApi(postId,browserHistory){
  return function(dispatch){
    return serverApi.deletePost(postId).then(
      post=>{
        console.log(browserHistory)
        browserHistory.push("/")
        dispatch(deletePost(post.id))

      }
    ).catch(error=>{
      throw(error);
    });
  };
}
export function upVotePostApi(postId){
  return dispatch => {
    dispatch (upVotePost(postId))
      return (serverApi.upVotePost(postId))


  }
}
export function downVotePostApi(postId){
  return dispatch => {
    dispatch (downVotePost(postId))
      return (serverApi.downVotePost(postId))


  }
}
