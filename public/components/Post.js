/***** 
 * 
 *  Posts.js 
 *  Created by: Aleena Watson
 *  Date: 2.25.2020
 * 
 * 
 *  View of post and comments. If user is logged in,
 *  they are able to add a comment on the post.
 * 
 *  Future improvements:
 *  - disable commenting feature for blogger to their own posts
 * 
 * 
 * ******/


const Comment = ({ item }) => {
    const { id, user, content } = item

    return (
        <div className="card mt-4" Style="width: 100%;">
            <div className="card-body"> 
                <p className="card-text" Style="white-space: pre-line;">{content || "No Content"}</p>
            </div>
        </div>
    )
}

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            user: { 
                loggedIn: false 
            },
            blog: {
                title: "", 
                description: "",
                theme: "light"
            }, 
            post: {
                title: "",
                content: ""
            },
            comments: []
        }
        this.blogId = window.location.href.split("/").slice(-3)[0]
        this.postId = window.location.href.split("/").slice(-1)[0]
    }

    componentDidMount() {
        this.getUser()
        this.getBlog()
        this.getPost()
        this.getComments()
    }

    getUser = async () => {
        const response = await fetch(`/user`)
        const data = await response.json()
        this.setState( {user: data} )
    }

    getBlog = async () => {
        const response = await fetch(`/blogs/${this.blogId}`)
        const data = await response.json()
        this.setState({ blog: data })
    }

    getPost = async () => {
        const response = await fetch(`/blogs/${this.blogId}/posts/${this.postId}`)
        const data = await response.json()
        this.setState({ post: data })
    }

    getComments = async () => {
        const response = await fetch(`/blogs/${this.blogId}/posts/${this.postId}/comments`)
        const data = await response.json()
        this.setState({ comments: data })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target)

        const body = JSON.stringify({
            content: data.get('content')
        })

        const headers = {
            'content-type': 'application/json',
            accept: 'application/json',
        }

        await fetch(`/blogs/${this.blogId}/posts/${this.postId}/comments`, {
            method: 'POST',
            headers,
            body,
        })

        window.location.reload()
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
                <div className="card mt-4" Style="width: 100%;">
                    <div className="card-body">
                        <div className=" btn-sm" Style="padding: 10px 10px 20px 0;">
                            <a className="btn btn-outline-info btn-sm" href={"/b/" + this.state.post.blogId}>Blog Homepage</a>
                        </div>
                        <a href={"/b/" + this.state.blog.id + "/p/" + this.state.post.id}><h5 className="card-title">{this.state.post.title || "No Title"}</h5></a>
                        <p className="card-text" Style="white-space: pre-line;">{this.state.post.content || "No Content"}</p>
                    </div>
                </div>
                <div className="card mt-4 bg-info text-white" Style="padding: 10px; width: 100%">Comments</div>
                {
                    this.state.comments.length > 0 ? (
                        this.state.comments.map(item =>
                            <Comment item={item} />)
                    ) : (
                        <div className="card mt-4">
                            <div className="card-body">This post has no comments yet!</div>
                        </div>
                    )
                }
                {
                    this.state.user.loggedIn == true ? (
                        <div className="card mt-4" Style="width: 100%;">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="mb-3">
                                        <textarea name="content" rows="3" className="form-control" placeholder="Comment"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-info btn-sm">Comment</button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="card mt-4 text-white bg-secondary" Style="width: 100%;">
                            <div className="card-body">Please login to make a comment</div>
                        </div>
                    )
                }
            </div >
        )
    }
}

const domContainer = document.querySelector('#root')
ReactDOM.render(React.createElement(Post), domContainer)