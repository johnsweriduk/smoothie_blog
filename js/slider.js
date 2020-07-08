class Slider extends React.Component {
    state = {
        featuredPosts: [],
        currentSlide: 0
    };

    componentDidMount = () => {
        this.getFeaturedPosts();
    }

    render = () => {
        return (
            <div className={"slider"}>
                <div className={"controls"}>
                    <div className={"left"}>
                        <a href="#" onClick={this.prevSlide}>leftarrow</a>
                    </div>
                    <div className={"right"}>
                        <a href="#" onClick={this.nextSlide}>rightarrow</a>
                    </div>
                    <div className={"current-slide"}>
                        { this.renderSlide() }
                    </div>
                </div>
            </div>
        )
    };

    getFeaturedPosts = () => {
        axios.get('/blogs/featured').then(
            response => {
                this.setState({
                    featuredPosts: response.data
                });
            }
        )
    }

    renderSlide = () => {
        return (
            <Slide slide={this.state.featuredPosts[this.state.currentSlide]} />
        );
    };

    nextSlide = () => {
        if(this.state.currentSlide < this.state.featuredPosts.length) {
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

    prevSlide = () => {
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
                    <img src={this.props.slide.image} />
                </div>
                <div className={"overlay"}>
                    <div className={"title"}>
                        <h3>{this.props.slide.title}</h3>
                    </div>
                    <div className={"snippet"}>
                        <p>{this.props.slide.snippet}</p>
                    </div>
                    <div className={"blog-meta"}>
                        <div className={"author"}>
                            <p>{this.props.slide.author}</p>
                        </div>
                        <div className={"published"}>
                            <p>{this.props.slide.created_at}</p>
                        </div>
                        <div className={"likes"}>
                            <p>{this.props.slide.likes}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}