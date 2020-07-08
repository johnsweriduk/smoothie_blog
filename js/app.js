const Router = window.ReactRouterDOM.BrowserRouter;
const Route =  window.ReactRouterDOM.Route;
const Link =  window.ReactRouterDOM.Link;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;

class SmoothiesGalore extends React.Component {
    state = {
        addPost: false
    }
    render = () => {
        /*return (
            <div className={"smoothies-galore"}>
                <div className={"nav"}>
                    <Link to="/">Home</Link>
                    <Link to="/add-post">Add Blog</Link>
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
        );*/
        return (
            <Router>
                <div className={"smoothies-galore"}>
                    <div className={"nav"}>
                        <Link to="/">Home</Link>
                        <Link to="/add-post">Add Blog</Link>
                    </div>
                    <Switch>
                        <Route path={"/blog/:id"} component={Blog}>
                        </Route>
                        <Route path={"/add-post"}>
                            <CreatePost />
                        </Route>
                        <Route path={"/"}>
                            <div className={"posts"}>
                                <Slider/>
                                <BlogList />
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
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
