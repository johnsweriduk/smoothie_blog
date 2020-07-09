class BlogList extends React.Component {
    state = {
        posts: []
    }

    componentDidMount = () => {
        axios.get('/blogs').then(
            response => {
                console.log(response);
                this.setState({
                    posts: response.data
                });
            }
        )
    }

    render = () => {
        return (
            <div className={"blog-list"}>
                <div className={"title"}>
                    <h2>Smoothie Blog</h2>
                </div>
                <ul>
                    { this.renderBlogs() }
                </ul>
            </div>
        );
    }
    renderBlogs = () => {
        return this.state.posts.map((blog) => {
            return <BlogShort key={blog.id} blog={blog} />;
        });
    }
}

class BlogShort extends React.Component {
    state = {}
    constructor(props){
      super(props)
      this.state.id=props.blog.id
      this.state.author=props.blog.author
      this.state.title=props.blog.title
      this.state.image=props.blog.image
      this.state.content=props.blog.content
      this.state.snippet=props.blog.snippet
      this.state.created_at=props.blog.created_at
      this.state.is_featured=props.blog.is_featured
      this.state.likes=props.blog.likes
    }

    likePost = () => {
      event.preventDefault();
      const newLikes = parseInt(this.state.likes) + 1;
      axios.put(
          '/blogs/' + this.state.id,
          {
              author: this.state.author,
              title: this.state.title,
              image: this.state.image,
              content: this.state.content,
              snippet: this.state.snippet,
              created_at: this.state.created_at,
              is_featured: this.state.is_featured,
              likes:newLikes,
          }
      ).then(
          (response) => {
              console.log(response);
              this.setState({
                likes:newLikes
              });
          }
      )
  }


    render = () => {
        return (
            <li>
                <div className="blog-post">
                    <div className={"image"}>
                        <Link to={"/blog/" + this.props.blog.id}><img src={this.props.blog.image} /></Link>
                    </div>
                    <div className={"overlay"}>
                        <div className={"title"}>
                            <h3><Link to={"/blog/" + this.props.blog.id}>{this.props.blog.title}</Link></h3>
                        </div>
                        <div className={"snippet"}>
                            <p>{this.props.blog.snippet}</p>
                        </div>
                        <div className={"blog-meta"}>
                            <div className={"author"}>
                                <p>Author: <span>{this.props.blog.author}</span></p>
                            </div>
                            <div className={"published"}>
                                <p>Published: <span>{this.props.blog.created_at}</span></p>
                            </div>
                            <div className={"likes"}>
                                <p>Likes: <span>{this.state.likes}</span> <button onClick={this.likePost}>❤</button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}
