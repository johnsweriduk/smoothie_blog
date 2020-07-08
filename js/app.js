class SmoothiesGalore extends React.Component {
    state = {
        addPost: false
    }
    render = () => {
        return (
            <div className={"smoothies-galore"}>
                <div className={"nav"}>
                    <a href={"/"} onClick={this.showPosts}>Home</a>
                    <a href={"/add-blog"} onClick={this.createPost}>Add Blog</a>
                </div>
                {this.state.addPost ?
                    <div className={"posts"}>
                        <Slider/>
                        < BlogList />
                    </div>
                    :
                    <CreatePost/>
                }
            </div>
        );
    }
    showPosts = () => {
        this.setState({
            addPost: false
        });
    }
    createPost = () => {
        this.setState({
            addPost: true
        })
    }
}
