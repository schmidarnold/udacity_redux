import React,{Component} from 'react'
import { connect } from 'react-redux'
import {loadPostComments,addCommentApi,upVoteCommentApi, downVoteCommentApi, deleteCommentApi,updateCommentApi} from '../actions/commentActions'
import { Button, Comment, Form, Header, Icon,Segment } from 'semantic-ui-react'
import {default as UUID} from 'node-uuid'
import Post from './Post'
import NewPost from './NewPost'
import PageNotFound from './PageNotFound'


class CommentList extends Component{

  state={
    author:"",
    body:"",
    isEditing:false,
    selectedId:"",
    showNewPost:false,
    editPost:true,
    isValid:false,
  }
  componentDidMount(){
    console.log ("ComponentList - component did mount")
   let curPostId = this.props.match.params.postId
   if (!curPostId){
     console.log("curPostId not valid")
   }
   this.props.getCommentsFromPost(curPostId)
   //console.log("componentDidMount " + curPostId)
  }
  componentWillReceiveProps(nextProps){
    if (this.props.curPost){
      console.log("componentWillReceiveProps post is valid")
      this.setState({
        isValid:true
      })
    }else{
      console.log("componentWillReceiveProps post is not valid")
    }


  }
  formattedDate = (timeStamp)=>{
    let fDate = new Date(timeStamp)
  //  console.log("formattedDate: " + fDate.toGMTString())
    return fDate.toGMTString()
  }
  editPostModal=(curPost)=>{
    //console.log("editing existing Post from PostList:  " + JSON.stringify(curPost));
    this.curPostData = curPost;
    this.setState({showNewPost:true})
  }
  closeNewPost = () =>{
    //console.log("closing Post from PostList");
    this.setState({showNewPost:false})
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  saveNewComment = () => {
    console.log("Save comment of post " + this.props.match.params.postId);

    const comment = {
        id: UUID.v4(),
        timestamp: new Date().getTime(),
        parentId: this.props.match.params.postId,
        author: this.state.author,
        body: this.state.body
     }
     this.props.addNewComment(comment)
     this.setState({
       author:"",
       body:"",
     })
  }
  deleteComment=(curComment)=>{
    this.props.deleteCurrentComment(curComment.id)
  }
  upComment=(curComment)=>{
    //console.log("upvote command clicked")
    this.props.upVoteCurrentComment(curComment.id)
  }
  downComment=(curComment)=>{
    console.log("downvote command clicked")
    this.props.downVoteCurrentComment(curComment.id)
  }
  onEditComment=(curComment)=>{
    console.log("curCommentId= " + curComment.id)
    this.setState({
      isEditing:true,
      selectedId:curComment.id,
      body:curComment.body,
      author: curComment.author,
    })

  }
  resetState=()=>{
    this.setState({
      isEditing:false,
      selectedId:"",
      body:"",
      author:"",
    })
  }
  cancelEdit=()=>{
    console.log("cancel clicked")
    this.resetState()
  }
  saveEdit=(curComment)=>{
    console.log("save clicked")
    const comment = {
      id: curComment.id,
      timestamp: new Date().getTime(),
      parentId: this.props.match.params.postId,
      author: curComment.author,
      body: this.state.body
    }
    this.props.updateCurrentComment(comment).then(() => {
      this.resetState()
    }).catch((err) => {
      console.error(err)
    })
  }
  render(){
    const {curPost,comments,categories}=this.props
    const categoryList = categories.map((item)=>(
      { key:item.name, text: item.name , value: item.name}
    ))

      console.log("rendering CommentList")




    return(
      <div>
      {this.state.isValid &&
      <div>
        <Post curPost={curPost} key={curPost.id}  details={true} onEdit={this.editPostModal}/>

      <Comment.Group>
        <Header as='h3' dividing>Comments</Header>
        {comments.map ((comment)=>(
          <Comment key={comment.id}>

            <Comment.Content>
              <Comment.Author as='a'>{comment.author}</Comment.Author>
              <Comment.Metadata>
                <div>{this.formattedDate(comment.timestamp)}</div>
              </Comment.Metadata>
              {(this.state.selectedId!==comment.id) &&
                <Comment.Text>
                  {comment.body}
                </Comment.Text>
              }
              {(this.state.selectedId===comment.id) &&
                <Form reply>
                  <Segment.Group horizontal>
                  <Segment>
                  <Form.TextArea placeholder='comment..' name='body' value={this.state.body} onChange={this.handleChange}/>
                  </Segment>


                  <Button icon>
                    <Icon name="save" onClick={()=>this.saveEdit(comment)}/>
                  </Button>
                  <Button icon>
                    <Icon name="cancel" onClick={()=>this.cancelEdit()}/>
                  </Button>

                </Segment.Group>
                </Form>
              }

                <Comment.Actions>
                  <Comment.Action>
                  voteScore: {comment.voteScore}
                  </Comment.Action>
                  <Comment.Action>
                  <Button  icon floated='right' onClick={()=>this.downComment(comment)}>
                    <Icon name='thumbs down'  />
                  </Button>
                  </Comment.Action>
                  <Comment.Action>
                  <Button  icon floated='right' onClick={()=> this.upComment(comment)}>
                    <Icon name='thumbs up'  />
                  </Button>
                  </Comment.Action>
                </Comment.Actions>
                <Comment.Actions>
                  <Comment.Action>
                    <Button  icon onClick={()=> this.deleteComment(comment)}>
                      <Icon name='trash'  />
                    </Button>
                    <Button  icon onClick={()=> this.onEditComment(comment)}>
                      <Icon name='edit'  />
                    </Button>
                  </Comment.Action>
                </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}
        <Segment>
        {!this.state.isEditing &&
        <Form reply>
          <Form.Input placeholder='author...' name='author' onChange={this.handleChange} value={this.state.author}/>
          <Form.TextArea placeholder='comment..' name='body' onChange={this.handleChange} value={this.state.body}/>
          <Button content='Add Comment' labelPosition='left' icon='edit' primary onClick={this.saveNewComment} />
      </Form>}
    </Segment>
      </Comment.Group>
      {this.state.showNewPost && <NewPost
        onClose={this.closeNewPost}
        categoryList={categoryList}
        open={true}
        curPostData={this.curPostData}
        editPost={this.state.editPost}
        />}
      </div>}
      {!this.state.isValid &&
        <PageNotFound/>
      }
      </div>

    )
  }


}
function mapStateToProps (state,props) {
  console.log("categoryList: " + state.categories)
  let categories = state.categories
  //console.log(JSON.stringify(categories))
  let commentArray = Object.values(state.comments)
  let curPost = state.posts[props.match.params.postId]
  //console.log("mapStateToProps, commentArray: " + JSON.stringify(commentArray))
  //console.log("mapStateToProps, curPost: " + JSON.stringify(curPost))
  return {
    curPost :curPost,
    comments: commentArray,
    categories: categories
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getCommentsFromPost: (postId) => dispatch(loadPostComments(postId)),
    addNewComment: (comment) => dispatch(addCommentApi(comment)),
    upVoteCurrentComment: (commentId) => dispatch(upVoteCommentApi(commentId)),
    downVoteCurrentComment: (commentId)=> dispatch(downVoteCommentApi(commentId)),
    deleteCurrentComment: (commentId)=> dispatch(deleteCommentApi(commentId)),
    updateCurrentComment: (comment)=>dispatch(updateCommentApi(comment)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (CommentList);
