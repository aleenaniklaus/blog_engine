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
                {/* User id showing up which is not ideal, if username is desired, would need to change database tables */}
                {/* <a href={"/p/" + id}><h5 className="card-title">{user || "No User"}</h5></a> */}  
                <p className="card-text">{content || "No Content"}</p>
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
            post: {
                title: "",
                content: ""
            },
            comments: []
        }
        this.blogId = 0 // Unknown but unnecessary
        this.postId = window.location.href.split("/").slice(-1)[0]
    }

    componentDidMount() {
        this.getUser()
        this.getPost()
        this.getComments()
    }

    getUser = async () => {
        const response = await fetch(`/user`)
        const data = await response.json()
        this.setState( {user: data} )
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
        return (
            <div>
                <AppNav />
                <div className="card mt-4" Style="width: 100%;">
                    <div className="card-body">
                        <a href={"/p/" + this.state.post.id}><h5 className="card-title">{this.state.post.title || "No Title"}</h5></a>
                        <p className="card-text">{this.state.post.content || "No Content"}</p>
                    </div>
                </div>
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
                                    <div className="input-group input-group-sm mb-3">
                                        <textarea name="content" className="form-control" placeholder="Content"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-info btn-sm ml-2">Comment</button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="card mt-4" Style="width: 100%;">
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