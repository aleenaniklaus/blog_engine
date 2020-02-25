'use strict'

const Post = ({ item }) => {
   const { id, title, content } = item

    return (
        <div class="card mt-4" Style="width: 100%;">
            <div class="card-body">
                <a href={"/p/" + id}><h5 class="card-title">{title || "No Title"}</h5></a>
                <p class="card-text">{content || "No Content"}</p>
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
                description: ""
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
       return (
           <div>
                <AppNav />
                <div class="card mt-4" Style="width: 100%; background-color: #e3f2fd">
                    <div class="card-body">
                        <a href={"/b/" + this.state.blog.id}><h5 class="card-title">{this.state.blog.title || "No Title"}</h5></a>
                        <p class="card-text">{this.state.blog.description || "No Description"}</p>
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

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(Blog), domContainer);