class Blog extends React.Component {
    state = {
        edit: false
    }

    componentDidMount = () => {
        console.log(this.props);
        let id = this.props.match.params.id;
        axios.get('/blogs/' + id).then(
            response => {
                console.log(response);
                let is_featured = false;
                if(response.data.is_featured == 't') {
                    is_featured = true;
                }
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    image: response.data.image,
                    author: response.data.author,
                    created_at: response.data.created_at,
                    likes: response.data.likes,
                    content: response.data.content,
                    is_featured: is_featured,
                    snippet: response.data.snippet,
                    history: this.props.history
                });
            }
        )
    }
    changeNewPostAuthor = (event) => {
        this.setState({
            author: event.target.value
        });
        // console.log(this);
    }

    changeNewPostTitle = (event) => {
        this.setState({
            title: event.target.value
        });
        // console.log(this);
    }

    changeNewPostPicture = (event) => {
        this.setState({
            image: event.target.value
        });
        // console.log(this);
    }


    changeNewPostContent = (event) => {
        this.setState({
            content: event.target.value
        });
        // console.log(this);
    }

    changeNewPostSnippet = (event) => {
        this.setState({
            snippet: event.target.value
        });
        // console.log(this);
    }

    changeNewPostCreatedAt = (event) => {
        this.setState({
            created_at: event.target.value
        });
        // console.log(this);
    }

    changeNewPostIsFeatured = (event) => {
        this.setState({
            is_featured: event.target.checked
        });
        // console.log(this);
    }
    editPost = () => {
        this.setState({
            edit: true
        })
    }
    editBlogPost = (event) => {
        event.preventDefault();
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
                likes:this.state.likes,
            }
        ).then(
            (response) => {
                console.log(response);
                this.setState({
                    edit: false
                });
            }
        )
    }
    deletePost = () => {
        axios.delete(
            '/blogs/' + this.state.id,
        ).then(response => {
            this.props.history.push('/');
        });
    }
    render = () => {
        if(this.state.edit) {
            return (
                <div className={"create-blog"}>
                    <h3>Edit New Post</h3>
                    <form onSubmit={this.editBlogPost}>
                        <input onChange={event => this.changeNewPostAuthor(event)} type="text" placeholder="Author" defaultValue={this.state.author} />
                        <input onChange={this.changeNewPostTitle} type="text" placeholder="Title" defaultValue={this.state.title} />
                        <input onChange={this.changeNewPostPicture} type="text" placeholder="Image URL" defaultValue={this.state.image} />
                        <input onChange={this.changeNewPostCreatedAt} type="date" defaultValue={this.state.created_at} />
                        <textarea onChange={this.changeNewPostContent} type="text" placeholder="Express your thoughts.." defaultValue={this.state.content} />
                        <textarea onChange={this.changeNewPostSnippet} type="text" placeholder="Include a snippet" defaultValue={this.state.snippet} />
                        <div className={"checkbox"}>
                            <label htmlFor="featured">Featured Post?</label>
                            <input onChange={this.changeNewPostIsFeatured} type="checkbox" name={"featured"} id={"featured"} defaultChecked={this.state.is_featured }/>
                        </div>
                        <button type="submit">Edit Post</button>
                        <button type={"button"} onClick={this.deletePost}>Delete Post</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className={"blog"}>
                    <div className={"image"}>
                        <img src={this.state.image}/>
                    </div>
                    <div className={"title"}>
                        <h1>{this.state.title}</h1>
                    </div>
                    <div className={"blog-meta"}>
                        <div className={"author"}>
                            <p>Author: <span>{this.state.author}</span></p>
                        </div>
                        <div className={"published"}>
                            <p>Published: <span>{this.state.created_at}</span></p>
                        </div>
                        <div className={"likes"}>
                            <p>Likes: <span>{this.state.likes}</span> <button onClick={this.likePost}>❤</button></p>
                        </div>
                    </div>
                    <div className={"blog-content"}>
                        <p>{this.state.content}</p>
                    </div>
                    <div className={"edit"}>
                        <button onClick={this.editPost}>Edit</button>
                    </div>
                </div>
            );
        }
    }
}