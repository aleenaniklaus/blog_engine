'use strict'
const e = React.createElement

const Comment = ({ item }) => {
   const { id, user, content } = item

    return (
        <div class="card mt-4" Style="width: 100%;">
            <div class="card-body">
                {/* <a href={"/p/" + id}><h5 class="card-title">{user || "No User"}</h5></a> */}
                <p class="card-text">{content || "No Content"}</p>
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
        const response = await fetch(`/blogs/${this.blogId}/posts/${this.postId}`);
        const data = await response.json();
        this.setState({ post: data })
    }

    getComments = async () => {
        const response = await fetch(`/blogs/${this.blogId}/posts/${this.postId}/comments`);
        const data = await response.json();
        this.setState({ comments: data })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
 
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
               <div class="card mt-4" Style="width: 100%;">
                    <div class="card-body">
                        <a href={"/p/" + this.state.post.id}><h5 class="card-title">{this.state.post.title || "No Title"}</h5></a>
                        <p class="card-text">{this.state.post.content || "No Content"}</p>
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
                    <div class="card mt-4" Style="width: 100%;">
                        <div class="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div class="input-group input-group-sm mb-3">
                                    <textarea name="content" class="form-control" placeholder="Content"></textarea>
                                </div>
                                <button type="submit" class="btn btn-info btn-sm ml-2">Comment</button>
                            </form>
                        </div>
                    </div>
                   ) : (
                    <div class="card mt-4" Style="width: 100%;">
                        <div class="card-body">Please login to make a comment</div>
                    </div>
                   )
               }
           </div >
       )
   }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Post), domContainer);