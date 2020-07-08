class SmoothiesGalore extends React.Component {
    render = () => {
        return (
            <div className={"smoothies-galore"}>
                <div className={"nav"}>
                    <a href={"/"}>Home</a>
                    <a href={"/add-blog"}>Add Blog</a>
                </div>
                <Slider />
                <BlogList />
            </div>
        );
    }
}
