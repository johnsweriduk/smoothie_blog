class CreatePost extends React.Component {
  state = {
    posts: []
  }


  createPost = (event) => {
    event.preventDefault();
    axios.post(
      '/blogs',
      {
        author:this.state.newPostAuthor,
        title:this.state.newPostTitle,
        image:this.state.newPostPicture,
        content:this.state.newPostContent,
        snippet:this.state.newPostSnippet,
        created_at:this.state.newPostCreatedAt,
        is_featured:false,
        likes:0,
      }
    ).then(
      (response) => {
        console.log(response);
        this.setState(
          {
            posts:response.data
          }
        )
      }
    )
  }


  changeNewPostAuthor = (event) => {
  this.setState({
    newPostAuthor:event.target.value
  });
  // console.log(this);
}

changeNewPostTitle = (event) => {
  this.setState({
    newPostTitle:event.target.value
  });
  // console.log(this);
}

changeNewPostPicture = (event) => {
  this.setState({
    newPostPicture:event.target.value
  });
  // console.log(this);
}


  changeNewPostContent = (event) => {
  this.setState({
    newPostContent:event.target.value
  });
  // console.log(this);
}

changeNewPostSnippet = (event) => {
  this.setState({
    newPostSnippet:event.target.value
  });
  // console.log(this);
}

changeNewPostCreatedAt = (event) => {
  this.setState({
    newPostCreatedAt:event.target.value
  });
  // console.log(this);
}

changeNewPostIsFeatured = (event) => {
  this.setState({
    newPostIsFeatured:event.target.value
  });
  // console.log(this);
}


render = () => {
  return <div>
  <h3>Create New Post</h3>
  <form onSubmit={this.createPost}>
  <input onKeyUp={this.changeNewPostAuthor} type="text" placeholder="Your name" />
  <input onKeyUp={this.changeNewPostTitle} type="text" placeholder="Title" />
  <input onKeyUp={this.changeNewPostPicture} type="text" placeholder="URL" />
  <input onKeyUp={this.changeNewPostContent} type="text" placeholder="Express your thoughts.." />
  <input onKeyUp={this.changeNewPostSnippet} type="text" placeholder="Include a snippet" />
  <input onKeyUp={this.changeNewPostCreatedAt} type="date" />
  <input onKeyUp={this.changeNewPostIsFeatured} type="checkbox" />
  <button type="submit">Create Post</button>
  </form>
  </div>

  }
}
