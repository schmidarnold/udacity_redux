import React,{Component} from 'react'
import { connect } from 'react-redux'
import {loadPostComments,addCommentApi,upVoteCommentApi, downVoteCommentApi, deleteCommentApi,updateCommentApi} from '../actions/commentActions'
import { Button, Comment, Form, Header,Card, Icon,Segment } from 'semantic-ui-react'
import {default as UUID} from 'node-uuid'


class CommentList extends Component{

  state={
    author:"",
    body:"",
    isEditing:false,
    selectedId:"",
  }
  componentDidMount(){
    console.log ("component did mount")
   let curPostId = this.props.match.params.postId
   this.props.getCommentsFromPost(curPostId)
   //console.log("componentDidMount " + curPostId)
  }
  formattedDate = (timeStamp)=>{
    let fDate = new Date(timeStamp)
  //  console.log("formattedDate: " + fDate.toGMTString())
    return fDate.toGMTString()
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
    const {curPost,comments}=this.props

    let date = new Date(curPost.timestamp)
    return(
      <div>
        <Card>
          <Card.Content>
        <Card.Header>{curPost.title}</Card.Header>
        <Card.Meta>"published: "  {date.toGMTString()}</Card.Meta>
        <Card.Description>{curPost.body}</Card.Description>
        </Card.Content>
      </Card>

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
                    <Button  icon>
                      <Icon name='trash' onClick={()=> this.deleteComment(comment)} />
                    </Button>
                    <Button  icon>
                      <Icon name='edit' onClick={()=> this.onEditComment(comment)} />
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
      </div>


    )
  }


}
function mapStateToProps (state,props) {
  //console.log("mapStateToProps, postId " + props.match.params.postId)
  let commentArray = Object.values(state.comments)
  let curPost = state.posts[props.match.params.postId]
  //console.log("mapStateToProps, commentArray: " + JSON.stringify(commentArray))
  //console.log("mapStateToProps, curPost: " + JSON.stringify(curPost))
  return {
    curPost :curPost,
    comments: commentArray
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
