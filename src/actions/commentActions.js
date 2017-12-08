import * as types from './actionTypes'
import serverApi from '../api/ServerApi';



export function loadCommentSuccess(comments){
  return{
    type: types.LOAD_POST_COMMENTS,
    comments
  };
}
export function addComment(comment){
  console.log ("action addComment " + JSON.stringify(comment));
  return{
    type: types.ADD_COMMENT,
    comment
  }
}
export function deleteComment(commentId){
  console.log ("action deleteComment " + JSON.stringify(commentId));
  return {
    type: types.DELETE_COMMENT,
    id: commentId
  }
}
export function updateComment(comment){
  console.log ("action updateComment" + JSON.stringify(comment));
  return{
    type: types.UPDATE_COMMENT,
    comment
  }
}
export function upVoteComment(commentId){
  console.log ("action upVoteComment " + JSON.stringify(commentId));
  return {
    type: types.UP_VOTE_COMMENT,
    id: commentId
  }
}
export function downVoteComment(commentId){
  console.log ("action downVoteComment " + JSON.stringify(commentId));
  return {
    type: types.DOWN_VOTE_COMMENT,
    id: commentId
  }
}
export function loadPostComments(postId){
  return function(dispatch){
    return serverApi.getCommentsOfPost(postId).then(
      comments =>{
        dispatch(loadCommentSuccess(comments))
      }).catch(error=>{
        throw(error);
      });

  };
}
export function addCommentApi(comment){
  return function(dispatch){
    return serverApi.postNewComment(comment).then(
      comment=>{
          dispatch(addComment(comment))
      }).catch(error=>{
        throw(error);
      });
  };
}
export function deleteCommentApi(commentId){
  return function(dispatch){
    return serverApi.deleteComment(commentId).then(
      comment=>{
        dispatch(deleteComment(comment.id))
      }
    ).catch(error=>{
      throw(error);
    });
  };
}
export function updateCommentApi(comment){
  return function(dispatch){
    return serverApi.putEditComment(comment).then(
      comment=>{

          dispatch(updateComment(comment))


      }).catch(error=>{
        throw(error);
      });
  };
}
export function upVoteCommentApi(commentId){

  return dispatch => {
    console.log("calling upVoteComment")
    dispatch (upVoteComment(commentId))
      return (serverApi.upVoteComment(commentId))
  }
}
export function downVoteCommentApi(commentId){
  return dispatch => {
    dispatch (downVoteComment(commentId))
      return (serverApi.downVoteComment(commentId))
  }
}
