import * as types from '../actions/actionTypes';

export default function commentReducer(state=[],action){
  switch(action.type) {
    case types.LOAD_POST_COMMENTS:
      //return action.comments;
      return action.comments.reduce( (acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        },{});
    case types.ADD_COMMENT:
          return {
            ...state,
          [action.comment.id]:action.comment
          }
    case types.UPDATE_COMMENT:
            {
            state[action.comment.id]={
              ...state[action.comment.id],
              ...action.comment

              }
              return {
                ...state
              }
            }
    case types.UP_VOTE_COMMENT:
            {
              state[action.id]={
                ...state[action.id],
              voteScore:state[action.id].voteScore+1
              }
              return{
                ...state
              }
            }
    case types.DOWN_VOTE_COMMENT:
              {
                state[action.id]={
                  ...state[action.id],
                voteScore:state[action.id].voteScore-1
                }
                return{
                  ...state
                }
              }
    case types.DELETE_COMMENT:
                {
                  delete state[action.id]
                  return{
                    ...state
                  }
                }
    default:
      return state;
  }
}
