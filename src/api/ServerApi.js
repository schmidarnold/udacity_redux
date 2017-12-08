class ServerApi {

static getServerUrl(){
  return "http://localhost:3001";
}
static getCategoryUrl(){
  const serverUrl = this.getServerUrl();
  return serverUrl+"/categories";
}
static getPostUrl(){
  const serverUrl = this.getServerUrl();
  return serverUrl+"/posts";
}
static getCommentUrl(){
  const serverUrl = this.getServerUrl();
  return serverUrl+"/comments";
}
static getCommentOfPostUrl(postId){
  const serverUrl = this.getServerUrl();
  return serverUrl+"/posts/"+postId+"/comments";
}

static requestHeaders(){
  return {
    "Content-Type":"application/json",
    Authorization: "arnold",
  }
}

static getAllCategories(){
  const headers = this.requestHeaders();

  const request = new Request(
    this.getCategoryUrl(),{
      method: 'GET',
      headers:headers
    })
    return fetch(request).then(response=>
      response.json()).then(data=>{
      return data.categories}
    ).catch(error =>{
      return error
    });


  }

static getAllPosts(){
  const headers = this.requestHeaders();

  const request = new Request(
    this.getPostUrl(),{
      method: 'GET',
      headers:headers
    })
    return fetch(request).then(response=>{
      return response.json()}
    ).catch(error =>{
      return error
    });


  }

  static getCommentsOfPost(postId){
    const headers = this.requestHeaders();

    const request = new Request(
      this.getCommentOfPostUrl(postId),{
        method: 'GET',
        headers:headers
      })
      return fetch(request).then(response=>{
        return response.json()}
      ).catch(error =>{
        return error
      });


    }

  static postNewPost(post){
    const headers = this.requestHeaders();
    const request = new Request(
      this.getPostUrl(),{
        method: 'POST',
        headers:headers,
        body: JSON.stringify(post)
      })
    return fetch(request).then(response=>{
      return response.json()
    }).catch(error =>{

    });

    }

  static putEditPost(post){
    const headers = this.requestHeaders();
    const request = new Request(
      this.getPostUrl()+"/"+post.id,{
        method: 'PUT',
        headers:headers,
        body: JSON.stringify(post)
      })
    return fetch(request).then(response=>{
      return response.json()
    }).catch(error =>{

    });

    }
  static deletePost(postId){
    const headers = this.requestHeaders();
    const request = new Request(
      this.getPostUrl()+"/"+postId,{
        headers:headers,
        method:'DELETE'
      }
    )
    return fetch(request).then(response=>{
      return response.json()
    }).catch(error=>{

    });
  }
  static upVotePost(postId){
    const headers = this.requestHeaders();
    const request = new Request(
      this.getPostUrl()+"/"+postId,{
        headers:headers,
        method:'POST',
        body: JSON.stringify({ option: 'upVote'})
      }
    )
    return fetch(request).then(response=>{
      return response.json()
    }).catch(error=>{

    });
  }
  static downVotePost(postId){
    const headers = this.requestHeaders();
    const request = new Request(
      this.getPostUrl()+"/"+postId,{
        headers:headers,
        method:'POST',
        body: JSON.stringify({ option: 'downVote'})
      }
    )
    return fetch(request).then(response=>{
      return response.json()
    }).catch(error=>{

    });
  }
  static postNewComment(comment){
    const headers = this.requestHeaders();
    console.log("postNewComment: "+ this.getCommentUrl())
    const request = new Request(
      this.getCommentUrl(),{
        method: 'POST',
        headers:headers,
        body: JSON.stringify(comment)
      })
    return fetch(request).then(response=>{
      return response.json()
    }).catch(error =>{

    });

    }
    static deleteComment(commentId){
      const headers = this.requestHeaders();
      const request = new Request(
        this.getCommentUrl()+"/"+commentId,{
          headers:headers,
          method:'DELETE'
        }
      )
      return fetch(request).then(response=>{
        return response.json()
      }).catch(error=>{

      });
    }
    static upVoteComment(commentId){
      const headers = this.requestHeaders();
      const request = new Request(
        this.getCommentUrl()+"/"+commentId,{
          headers:headers,
          method:'POST',
          body: JSON.stringify({ option: 'upVote'})
        }
      )
      return fetch(request).then(response=>{
        return response.json()
      }).catch(error=>{

      });
    }
    static downVoteComment(commentId){
      const headers = this.requestHeaders();
      const request = new Request(
        this.getCommentUrl()+"/"+commentId,{
          headers:headers,
          method:'POST',
          body: JSON.stringify({ option: 'downVote'})
        }
      )
      return fetch(request).then(response=>{
        return response.json()
      }).catch(error=>{

      });
    }
    static putEditComment(comment){
      const headers = this.requestHeaders();
      const request = new Request(
        this.getCommentUrl()+"/"+comment.id,{
          method: 'PUT',
          headers:headers,
          body: JSON.stringify(comment)
        })
      return fetch(request).then(response=>{
        return response.json()
      }).catch(error =>{

      });

      }

  }

export default ServerApi;
