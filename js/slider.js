class Slider extends React.Component {
    state = {
        featuredPosts: [],
        currentSlide: 0
    };

    componentDidMount = () => {
        console.log('test');
        this.getFeaturedPosts();
    }

    render = () => {
        return (
            <div className={"slider"}>
                <div className={"controls"}>
                    <div className={"left"}>
                        <a href="#" onClick={this.prevSlide}>Next</a>
                    </div>
                    <div className={"right"}>
                        <a href="#" onClick={this.nextSlide}>Prev</a>
                    </div>
                </div>
                <div className={"current-slide"}>
                    { this.renderSlide() }
                </div>
            </div>
        )
    };

    getFeaturedPosts = () => {
        axios.get('/blogs/featured').then(
            response => {
                console.log(response);
                this.setState({
                    featuredPosts: response.data
                });
            }
        )
    }

    renderSlide = () => {
        if(this.state.featuredPosts.length) {
            return (
                <Slide slide={this.state.featuredPosts[this.state.currentSlide]}/>
            );
        } else {
            const post = {
                author: 'test',
                title: 'Test',
                image: 'test',
                content: 'test',
                snippet: 'test',
                created_at: 'test',
                is_featured: 'test'
            };
            return (
                <Slide slide={post}/>
            );
        }
    };

    nextSlide = event => {
        event.preventDefault();
        if(this.state.currentSlide < this.state.featuredPosts.length - 1) {
            const nextSlide = this.state.currentSlide + 1;
            this.setState({
                currentSlide: nextSlide
            });
        } else {
            this.setState({
                currentSlide: 0
            });
        }
    };

    prevSlide = event => {
        event.preventDefault();
        if(this.state.currentSlide === 0) {
            this.setState({
                currentSlide: this.state.featuredPosts.length - 1
            });
        } else {
            const prevSlide = this.state.currentSlide - 1;
            this.setState({
                currentSlide: prevSlide
            });
        }
    };
}

class Slide extends React.Component {
    render = () => {
        return (
            <div className={"slide"}>
                <div className={"image"}>
                    <Link to={"/blog/" + this.props.slide.id}><img src={this.props.slide.image} /></Link>
                </div>
                <div className={"overlay"}>
                    <div className={"title"}>
                        <h3><Link to={"/blog/" + this.props.slide.id}>{this.props.slide.title}</Link></h3>
                    </div>
                    <div className={"snippet"}>
                        <p>{this.props.slide.snippet}</p>
                    </div>
                    <div className={"blog-meta"}>
                        <div className={"author"}>
                            <p>Author: <span>{this.props.slide.author}</span></p>
                        </div>
                        <div className={"published"}>
                            <p>Published: <span>{this.props.slide.created_at}</span></p>
                        </div>
                        <div className={"likes"}>
                            <p>Likes: <span>{this.props.slide.likes}</span> <button onClick={this.likePost}>❤</button></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    likePost = () => {

    }
}