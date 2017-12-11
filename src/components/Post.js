import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Card,Button,Icon} from 'semantic-ui-react'
import {deletePostApi, upVotePostApi,downVotePostApi} from '../actions/postActions'
import { Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";
class Post extends Component {


  deletePost=(curPost)=>{

     //console.log("deleting post " + (this.props.history))
    this.props.deleteCurrentPost(curPost.id, this.props.history).then(() => {
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
    const {curPost, onEdit, details} = this.props
    let date = new Date(curPost.timestamp)

    return(

      <Card>
        <Card.Content>
          {(!details) &&
          <div className='header'><Link to ={`/${curPost.category}/${curPost.id}`}> {curPost.title} </Link></div>
          }
          {(details)&&
            <div className='header'> {curPost.title} </div>
          }
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
    deleteCurrentPost: (postId,history)=> dispatch(deletePostApi(postId,history)),
    upVoteCurrentPost: (postId)=> dispatch(upVotePostApi(postId)),
    downVoteCurrentPost: (postId)=>dispatch(downVotePostApi(postId))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (Post));
