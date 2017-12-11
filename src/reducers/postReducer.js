import * as types from '../actions/actionTypes';


export default function postReducer(state=[],action){
  //console.log("postReducer: " + JSON.stringify(action.post));
  switch(action.type) {
    case types.LOAD_POST_SUCCESS:
    //  return action.posts;
    return action.posts.reduce( (acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      },{});
    case types.ADD_POST:
      return {
        ...state,
      [action.post.id]:action.post
      }

    //  return [
    //    ...state,action.post
    //  ]
    /* {
      let newArray = state.slice();
      newArray.splice(action.index, 0, action.post);
      console.log("postReducer new state: " + newArray);
      return newArray;
    }*/
    /*  return{ this version not running
        ...state,
        posts: [...state.posts, action.post]
      }
    */
    case types.UPDATE_POST:
      {
      state[action.post.id]={
        ...state[action.post.id],
        ...action.post

        }
        return {
          ...state
        }
      }
    case types.UP_VOTE_POST:
      {
        state[action.id]={
          ...state[action.id],
        voteScore:state[action.id].voteScore+1
        }
        return{
          ...state
        }
      }
      case types.DOWN_VOTE_POST:
        {
          state[action.id]={
            ...state[action.id],
          voteScore:state[action.id].voteScore-1
          }
          return{
            ...state
          }
        }
    case types.DELETE_POST:
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
