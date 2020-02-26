/***** 
 * 
 *  AdminBlogs.js 
 *  Created by: Aleena Watson
 *  Date: 2.25.2020
 * 
 * 
 *  This is the first page a user sees once they have registered.
 *  This is the home page of the user, and they are able to add 
 *  new blogs, and by clicking on a blog that has been added, they
 *  are taken to that blog's page (see BlogPosts.js). Here they can 
 *  manage their blogs (add new blog, delete blog, edit blog).
 * 
 *  Future improvements: 
 *  - Allow user to upload a file when adding a new blog, instead of
 *   entering text into textbox. 
 *  - Allow for templating on a given blog, including color scheme,
 *   font change, and other common templating options.
 *  - Allow user to 'archive' a blog, so as to not show a blog, but
 *    not need to delete the blog entirely.
 * 
 * 
 * ******/


const Blog = ({ item, handleSubmit, handleEdit, handleDelete, handleCancel }) => {
const { id, title, description, editMode } = item

if (editMode) {
    return (
        <div className="card mt-4" Style="width: 100%;">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={item.id} />
                    <div className="input-group input-group-sm mb-3">
                        <input type="text" name="title" className="form-control" placeholder="Blog Title" defaultValue={title} />
                    </div>
                    <div className="mb-3">
                        <textarea name="description" className="form-control" rows="5" cols="50" placeholder="Blog Description" defaultValue={description}></textarea>
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
                    <p className="card-text" Style="white-space: pre-line;">{description || "No Description"}</p>
                    <a className="btn btn-outline-info btn-sm ml-2" href={"/b/" + id}>Preview Blog</a>
                    <button type="submit" className="btn btn-info btn-sm ml-2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline-danger btn-sm ml-2" onClick={handleDelete}>Delete</button>
                    <a className="btn btn-outline-dark btn-sm ml-2 float-right" href={"/admin/" + id}>Edit Posts</a>
                </div>
            </div>
        )
    }
}

class AdminBlogs extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
    }

    componentDidMount() {
        this.getBlogs()
    }

    getBlogs = async () => {
        const response = await fetch('/blogs')
        const data = await response.json()
        data.forEach(item => item.editMode = false)
        this.setState({ data })
    }

    addNewBlog = () => {
        const data = this.state.data
        data.unshift({
            editMode: true,
            title: "",
            description: ""
        })
        this.setState({ data })
    }

    handleCancel = async () => {
        await this.getBlogs()
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

    handleDelete = async (blogId) => {
        await fetch(`/blogs/${blogId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
        })
        await this.getBlogs()
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target)

        const body = JSON.stringify({
            title: data.get('title'),
            description: data.get('description'),
        })

        const headers = {
            'content-type': 'application/json',
            accept: 'application/json',
        }

        if (data.get('id')) {
            await fetch(`/blogs/${data.get('id')}`, {
                method: 'PUT',
                headers,
                body,
            })
        } else {
            await fetch('/blogs', {
                method: 'POST',
                headers,
                body,
            })
        }
        await this.getBlogs()
    }

    render() {
        return (
            <div>
                <AppNav />
                <button type="button" className="mt-4 mb-2 btn btn-primary btn-sm float-right" onClick={this.addNewBlog}>
                    Add New Blog
                </button>
                {
                    this.state.data.length > 0 ? (
                        this.state.data.map(item =>
                            <Blog item={item}
                                handleSubmit={this.handleSubmit}
                                handleEdit={this.handleEdit.bind(this, item.id)}
                                handleDelete={this.handleDelete.bind(this, item.id)}
                                handleCancel={this.handleCancel}
                            />
                            )
                    ) : (
                        <div className="card mt-5 col-sm">
                            <div className="card-body">You don't have any blogs. Use the "Add New Blog" button to add a new blog!</div>
                        </div>
                    )
                }
            </div >
        )
    }
}

const domContainer = document.querySelector('#root')
ReactDOM.render(React.createElement(AdminBlogs), domContainer);