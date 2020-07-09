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
    likePost = () => {

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
                                <p>Likes: <span>{this.props.blog.likes}</span> <button onClick={this.likePost}>❤</button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}