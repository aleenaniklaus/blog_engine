/***** 
 * 
 *  Blog.js 
 *  Created by: Aleena Watson
 *  Date: 2.25.2020
 * 
 * 
 *  Populate blog title and description as well as posts 
 *  of that given blog to the page. For every blog, there 
 *  are either 0-many posts available. Posts are readable 
 *  by anyone in this module.
 * 
 * 
 * ******/


const Post = ({ item }) => {
   const { blogId, id, title, content } = item

    return (
        <div className="card mt-4" Style="width: 100%;">
            <div className="card-body">
                <a href={"/b/" + blogId + "/p/" + id}><h5 className="card-title">{title || "No Title"}</h5></a>
                <p className="card-text" Style="white-space: pre-line;">{content || "No Content"}</p>
            </div>
        </div>
    )
}

class Blog extends React.Component {
    constructor(props) {
       super(props)
       this.state = { 
            blog: {
                title: "", 
                description: "",
                theme: "light"
            }, 
            posts: [] 
        }
       this.blogId = window.location.href.split("/").slice(-1)[0]
    }
    componentDidMount() {
        this.getBlog()
        this.getBlogPosts()
    }

    getBlog = async () => {
        const response = await fetch(`/blogs/${this.blogId}`)
        const data = await response.json()
        this.setState({ blog: data })
    }

    getBlogPosts = async () => {
       const response = await fetch(`/blogs/${this.blogId}/posts`)
       const data = await response.json()
       this.setState({ posts: data })
    }

    render() {
        if(this.state.blog.theme === "light") {
            document.getElementById("bootstrap").href = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        }
        else if(this.state.blog.theme === "dark"){
            document.getElementById("bootstrap").href = "https://bootswatch.com/4/darkly/bootstrap.css"
        }
        return (
            <div>
                <AppNav />
                <div className="card mt-4 bg-info text-white" Style="width: 100%;">
                    <div className="card-body">
                        <h5 className="card-title">{this.state.blog.title || "No Title"}</h5>
                        <p className="card-text" Style="white-space: pre-line;">{this.state.blog.description || "No Description"}</p>
                    </div>
                </div>
                {
                    this.state.posts.length > 0 ? (
                        this.state.posts.map(item =>
                            <Post item={item} />)
                    ) : (
                        <div className="card mt-5 col-sm">
                            <div className="card-body">This blog has no posts yet!</div>
                        </div>
                    )
                }
            </div >
        )
    }
}

const domContainer = document.querySelector('#root')
ReactDOM.render(React.createElement(Blog), domContainer)