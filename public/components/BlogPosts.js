/***** 
 * 
 *  BlogPosts.js 
 *  Created by: Aleena Watson
 *  Date: 2.25.2020
 * 
 * 
 *  Blog Posts component populates the posts of a given 
 *  blog. This component allows the logged in user to edit, 
 *  delete, and add a new blog post. There may be 0-many 
 *  blog posts for a given blog. In this component, the admin
 *  user will not see comments.
 * 
 *  Future improvements:
 *  - add ability to see comments on posts
 * 
 * 
 * ******/


const Post = ({ item, handleSubmit, handleEdit, handleDelete, handleCancel }) => {
   const { title, content, editMode } = item

    if (editMode) {
        return (
            <div className="card mt-4" Style="width: 100%;">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="id" value={item.id} />
                        <div className="input-group input-group-sm mb-3">
                            <input type="text" name="title" className="form-control" placeholder="Title" defaultValue={title} />
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <textarea name="content" className="form-control" placeholder="content" defaultValue={content}></textarea>
                        </div>
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="btn btn-info btn-sm ml-2">Save</button>
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <div className="card mt-4" Style="width: 100%;">
                <div className="card-body">
                    <h5 className="card-title">{title || "No Title"}</h5>
                    <p className="card-text">{content || "No Content"}</p>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
                    <button type="submit" className="btn btn-info btn-sm ml-2" onClick={handleEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

class BlogPosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
        this.blogId = window.location.href.split("/").slice(-1)[0]
    }

    componentDidMount() {
        this.getBlogPosts()
    }

    getBlogPosts = async () => {
        const response = await fetch(`/blogs/${this.blogId}/posts`)
        const data = await response.json()
        data.forEach(item => item.editMode = false)
        this.setState({ data })
    }

    addNewBlogPost = () => {
        const data = this.state.data
        data.unshift({
            editMode: true,
            title: "",
            content: ""
        })
        this.setState({ data })
    }

    handleCancel = async () => {
        await this.getBlogPosts()
    }

    handleEdit = (postId) => {
        const data = this.state.data.map((item) => {
            if (item.id === postId) {
                item.editMode = true
            }
            return item
        })
        this.setState({ data })
    }

    handleDelete = async (postId) => {
        await fetch(`/blogs/${this.blogId}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
        })
        await this.getBlogPosts()
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target)

        const body = JSON.stringify({
            title: data.get('title'),
            content: data.get('content')
        })

        const headers = {
            'content-type': 'application/json',
            accept: 'application/json',
        }

        if (data.get('id')) {
            await fetch(`/blogs/${this.blogId}/${data.get('postId')}`, {
                method: 'PUT',
                headers,
                body,
            })
        } else {
            await fetch(`/blogs/${this.blogId}/posts`, {
                method: 'POST',
                headers,
                body,
            })
        }
        await this.getBlogPosts()
    }

    render() {
        return (
            <div>
                <AppNav />
                <button type="button" className="mt-4 mb-2 btn btn-primary btn-sm float-right" onClick={this.addNewBlogPost}>
                    Add New Post
                </button>
                {
                    this.state.data.length > 0 ? (
                        this.state.data.map(item =>
                            <Post item={item}
                                handleSubmit={this.handleSubmit}
                                handleEdit={this.handleEdit.bind(this, item.id)}
                                handleDelete={this.handleDelete.bind(this, item.id)}
                                handleCancel={this.handleCancel}
                            />)
                    ) : (
                        <div className="card mt-5 col-sm">
                            <div className="card-body">You don't have any posts. Use the "Add New Post" button to add a new post!</div>
                        </div>
                    )
                }
            </div >
        )
    }
}

const domContainer = document.querySelector('#root')
ReactDOM.render(React.createElement(BlogPosts), domContainer)