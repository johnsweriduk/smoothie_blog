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
                this.setState({
                    title: response.data.title,
                    image: response.data.image,
                    author: response.data.author,
                    created_at: response.data.created_at,
                    likes: response.data.likes,
                    content: response.data.content
                });
            }
        )
    }

    render = () => {
        if(this.state.edit) {
            return (
                <div className={"edit"}>

                </div>
            );
        } else {
            return (
                <div className={"blog"}>
                    <div className={"image"}>
                        <img src={this.state.image}/>
                    </div>
                    <div className={"blog-meta"}>
                        <div className={"title"}>
                            <h1>{this.state.title}</h1>
                        </div>
                        <div className={"author"}>
                            <p>{this.state.author}</p>
                        </div>
                        <div className={"created-at"}>
                            <p>{this.state.created_at}</p>
                        </div>
                        <div className={"like"}>
                            <p>{this.state.likes}</p>
                        </div>
                    </div>
                    <div className={"blog-content"}>
                        <p>{this.state.content}</p>
                    </div>
                </div>
            );
        }
    }
}