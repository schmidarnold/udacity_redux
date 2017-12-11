import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Button,Modal,Form,Input,TextArea} from 'semantic-ui-react'
import {default as UUID} from 'node-uuid'
import {addPostApi,editPostApi} from '../actions/postActions'
class NewPost extends Component {
  componentDidMount(){
    const {curPostData,editPost}= this.props
    if (curPostData && editPost){
      console.log("Editing entry : " + JSON.stringify(editPost));
      this.setState({
        title: curPostData.title,
        body: curPostData.body,
        author: curPostData.author,
        category: curPostData.category,
      });

    }else{
      console.log("New Entry");
    }

  }
  state = {

    title: '',
    body:'',
    author:'',
    category:'',
   }


   handleChange = (e, { name, value }) => this.setState({ [name]: value })
   saveNewPostModal = () => {

     let error=false
     if (this.state.author ===""){
       error=true
     }
     if (this.state.title ===""){
       error=true
     }
     if (this.state.category ===""){
       error=true
     }
     if (!error){
       //console.log("Saving state:" + JSON.stringify(this.state))
        console.log("Edit state: " + this.props.editPost)
        if (!this.props.editPost){
          console.log("adding new entry to redux store and backend")
          const post = {
             id: UUID.v4(),
             timestamp: new Date().getTime(),
             ...this.state
           }

          this.props.createNewPost(post).then(() => {
            this.props.onClose()

          }).catch((err) => {
            console.error(err)
          })
        }else{
          const post = {
            id: this.props.curPostData.id,
            timestamp : this.props.curPostData.timestamp,
            ...this.state
          }
          console.log("updating entry from redux store and backend")
          this.props.updatePost(post).then(() => {
            this.props.onClose()
          }).catch((err) => {
            console.error(err)
          })
          // existing Entry
        }



     }else{
       console.log("Form not complete")
     }



   }





render(){

  const{onClose, categoryList, open}=this.props

  return(
   <div>
   <Modal size='large' open={open} onClose={onClose}>


      {(this.props.editPost) &&
       <Modal.Header>
         EDIT POST
       </Modal.Header>
      }
      {(!this.props.editPost) &&
       <Modal.Header>
         NEW POST
       </Modal.Header>
      }
       <Modal.Content>
         <Form >
           <Form.Field required>
             <label>author</label>
             <Input placeholder='name of author' name='author' onChange={this.handleChange} value={this.state.author}/>
           </Form.Field>
           <Form.Field required>
             <label>title</label>
             <Input placeholder='title of post' name='title' onChange={this.handleChange} value={this.state.title}/>
           </Form.Field>
           <Form.Field control={TextArea} label='text' name='body' placeholder='Your post ...' onChange={this.handleChange} value={this.state.body}/>
           <Form.Select label='Category' name='category' options={categoryList} placeholder='Select category' onChange={this.handleChange} value={this.state.category}/>

       </Form>
       </Modal.Content>
       <Modal.Actions>
         <Button negative onClick={onClose}>
           Cancel
         </Button>
         <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={this.saveNewPostModal}/>
       </Modal.Actions>
     </Modal>
   </div>
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
    createNewPost: (newItem)=> dispatch(addPostApi(newItem)),
    updatePost: (updatingItem)=>dispatch(editPostApi(updatingItem))

  }
}
export default connect(mapStateToProps,mapDispatchToProps) (NewPost);
