import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Card,Button,Icon} from 'semantic-ui-react'
import {deletePostApi, upVotePostApi,downVotePostApi} from '../actions/postActions'
import { Link } from 'react-router-dom';

class Post extends Component{
  state= {

  }
  componentDidMount(){

  }

  deletePost=(curPost)=>{

     console.log("deleting post " + (curPost.id))
    this.props.deleteCurrentPost(curPost.id).then(() => {
      console.log("post deleted successfully")

    }).catch((err) => {
      console.error(err)
    })
  }
  upVotePost=(curPost)=>{
    this.props.upVoteCurrentPost(curPost.id)
  }
  downVotePost=(curPost)=>{
    this.props.downVoteCurrentPost(curPost.id)
  }
  render(){
    const {curPost, onEdit} = this.props
    let date = new Date(curPost.timestamp)

    console.log(date.toGMTString());
    return(

      <Card>
        <Card.Content>
          <div className='header'><Link to ={`/${curPost.id}/comments`}> {curPost.title} </Link></div>

        </Card.Content>
          <Card.Content extra>
            author: {curPost.author} <br/>
            timestamp: {date.toGMTString()}
          </Card.Content>
        <Card.Content description={curPost.body} />
        <Card.Content extra>
          voteScore: {curPost.voteScore}
          <Button  icon floated='right' onClick={()=>this.downVotePost(curPost)}>
            <Icon name='thumbs down'  />
          </Button>
          <Button  icon floated='right' onClick={()=> this.upVotePost(curPost)}>
            <Icon name='thumbs up'  />
          </Button>
        </Card.Content>
        <Card.Content extra>
          comments: {curPost.commentCount}

        </Card.Content>
        <Card.Content extra>
          <Button onClick={()=> onEdit(curPost)} icon>
            <Icon name='edit' />
          </Button>
          <Button  icon>
            <Icon name='delete' onClick={()=> this.deletePost(curPost)} />
          </Button>
        </Card.Content>


      </Card>







    )
  }


}
function mapStateToProps ({ posts }) {
  return {
    posts
  }
}
function mapDispatchToProps (dispatch) {
  return {
    deleteCurrentPost: (postId)=> dispatch(deletePostApi(postId)),
    upVoteCurrentPost: (postId)=> dispatch(upVotePostApi(postId)),
    downVoteCurrentPost: (postId)=>dispatch(downVotePostApi(postId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Post);
