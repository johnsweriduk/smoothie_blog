class BlogPost extends React.Component {
  state = {
    posts: []
  }

  componentDidMount = () => {
        axios.get('/blogs').then(
            response => {
                this.setState({
                    posts: response.data
                });
            }
        )
    }


  render = () => {
    return <div>
      <h2>Created Posts</h2>
        <ul>
        {
          this.state.posts.map(
            (blog) => {
              return <li key={blog.id}>
              <div className="Posted">

                <div className={"image"}>
                <img src={blog.image} />
                </div>
                  <div className={"overlay"}>

                  <div className={"title"}>

                  <h3>{blog.title}</h3>
                  </div>

                  <div className={"snippet"}>
                  <p>{blog.snippet}</p>
                  </div>

                  <div className={"blog-meta"}>

                  <div className={"author"}>

                   <p>{blog.author}</p>
                   </div>

                   <div className={"published"}>
                   <p>{blog.created_at}</p>
                   </div>

                   <div className={"likes"}>
                   <p>{blog.likes}</p>

                   </div>
                 </div>
                </div>
              </div>
              </li>
            }
          )
        }
        </ul>
    </div>
  }
}
