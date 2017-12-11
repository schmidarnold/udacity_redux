import React,{Component} from 'react'
import { connect } from 'react-redux'
import {loadPosts} from '../actions/postActions'
import {setSorting} from '../actions/sortActions'
import Post from './Post'
import NewPost from './NewPost'
import { Card,Button,Dropdown,Segment} from 'semantic-ui-react'
/* Code for changing the array in hashtable and backwards
posts.reduce( (acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      },{});
and returning to an array for iterating through
posts: Object.values(posts.items)

*/

class PostList extends Component{
  state = {
    showNewPost:false,
    editPost:false,
  }

  
  closeNewPost = () =>{
    //console.log("closing Post from PostList");
    this.setState({editPost:false})
    this.setState({showNewPost:false})
  }
  openNewPostModal=()=>{
    this.setState({showNewPost:true})
  }
  editPostModal=(curPost)=>{
    //console.log("editing existing Post from PostList:  " + JSON.stringify(curPost));
    this.curPostData = curPost;
    this.setState({editPost:true})
    this.setState({showNewPost:true})
  }
  onChangeOrder=(event,data)=>{
    console.log("changed sorting: " + data.value);
    this.props.setOrder(data.value);
  }
  render(){
    const posts = this.props.postArray
    const categories = this.props.categories
    //let curPostData=undefined;

    let showingPosts
    const categoryList = categories.map((item)=>(
      { key:item.name, text: item.name , value: item.name}
    ))
    const orderOptions = [
      {text: "date", value: "date"},
      {text: "score", value: "score"},
      {text: "title", value: "title"}
    ]

  //  console.log("categoryList:" +JSON.stringify(categoryList))

    if (this.props.match.params.category){
      //console.log("Filtered posts");
      //console.log(JSON.stringify(posts));
      showingPosts = posts.filter(item => item.category === this.props.match.params.category)

    }else{
      //console.log("All posts");
      //console.log(JSON.stringify(posts));
      showingPosts= posts
    }
    return(
      <div>


            <Button.Group floated="right">
              <Button primary onClick={this.openNewPostModal}>New Post</Button>
            </Button.Group>



      <Card.Group>
        {showingPosts.map((post)=>
          (

            <Post curPost={post} key={post.id} onEdit={this.editPostModal} details={false}/>

          )
        )}

      </Card.Group>
      <Segment floated='left'>
        <Dropdown placeholder='Select Order' onChange={this.onChangeOrder} selection options={orderOptions} />
      </Segment>
      {this.state.showNewPost && <NewPost
        onClose={this.closeNewPost}
        categoryList={categoryList}
        open={true}
        curPostData={this.curPostData}
        editPost={this.state.editPost}
        />}
      </div>

    )
  }


}
function mapStateToProps ({ posts, categories, sortOrder }) {
  let postArray = Object.values(posts)
  switch (sortOrder){
    case "date":
      postArray.sort((a, b) => b.timestamp - a.timestamp);
      break;
    case "score":
      postArray.sort((a,b) => b.voteScore - a.voteScore);
      break;
    case "title":
    postArray.sort((a, b)=>{
      var titleA=a.title.toLowerCase(), titleB=b.title.toLowerCase();
        if (titleA < titleB) //sort string ascending
          return -1;
        if (titleA > titleB)
        return 1;
        return 0; //default return value (no sorting)
      });
      break;
    default:
      postArray.sort((a,b)=> b.timestamp - a.timestamp)
  }
  //console.log(JSON.stringify(postArray));
  //console.log("sorting order: " + sortOrder);
  return {
    postArray,
    categories,
    sortOrder,
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: () => dispatch(loadPosts()),
    setOrder:(sort) =>dispatch(setSorting(sort))
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (PostList);
