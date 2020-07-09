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
                console.log(this.state.featuredPosts);
            }
        )
    }

    renderSlide = () => {
        if(this.state.featuredPosts.length) {
            return (
                <Slide slide={this.state.featuredPosts[this.state.currentSlide]} />
            );
        } else {
            const post = {
                author: 'test',
                title: 'Test',
                image: 'test',
                content: 'test',
                snippet: 'test',
                created_at: 'test',
                is_featured: 'test',
                likes: 0,
                id: 0
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
  state = {}
  constructor(props){
    super(props)
    this.state.id=props.slide.id
    this.state.author=props.slide.author
    this.state.title=props.slide.title
    this.state.image=props.slide.image
    this.state.content=props.slide.content
    this.state.snippet=props.slide.snippet
    this.state.created_at=props.slide.created_at
    this.state.is_featured=props.slide.is_featured
    this.state.likes=props.slide.likes
    console.log(props.id);
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
                            <p>Likes: <span>{this.state.likes}</span> <button onClick={this.likePost}>❤</button></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  }
