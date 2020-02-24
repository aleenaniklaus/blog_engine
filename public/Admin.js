'use strict';
const e = React.createElement;

const AppNav = () => (
   <nav className="navbar navbar-dark bg-dark">
       <a className="navbar-brand" href="#">My Blog Space</a>
       <a role="button" className="btn btn-outline-info navbar-btn" href="/logout">Logout</a>
   </nav>
)

const Card = ({ item, handleSubmit, handleEdit, handleDelete, handleCancel }) => {
   const { title, description, editMode } = item;

   if (editMode) {
       return (
           <div class="card mt-4" Style="width: 100%;">
               <div class="card-body">
                   <form onSubmit={handleSubmit}>
                       <input type="hidden" name="id" value={item.id} />
                       <div class="input-group input-group-sm mb-3">
                           <input type="text" name="title" class="form-control" placeholder="Title" defaultValue={title} />
                       </div>
                       <div class="input-group input-group-sm mb-3">
                           <textarea name="description" class="form-control" placeholder="Description" defaultValue={description}></textarea>
                       </div>
                       <button type="button" class="btn btn-outline-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                       <button type="submit" class="btn btn-info btn-sm ml-2">Save</button>
                   </form>
               </div>
           </div>
       )
   } else {
       return (
           <div class="card mt-4" Style="width: 100%;">
               <div class="card-body">
                   <h5 class="card-title">{title || "No Title"}</h5>
                   <p class="card-text">{description || "No Description"}</p>
                   <button type="button" class="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
                   <button type="submit" class="btn btn-info btn-sm ml-2" onClick={handleEdit}>Edit</button>
               </div>
           </div>
       )
   }
}

class Admin extends React.Component {
   constructor(props) {
       super(props);
       this.state = { data: [] };
   }

   componentDidMount() {
       this.getBlogs();
   }

   getBlogs = async () => {
       const response = await fetch('/blogs');
       const data = await response.json();
       data.forEach(item => item.editMode = false);
       this.setState({ data })
   }

   addNewBlog = () => {
       const data = this.state.data;
       data.unshift({
           editMode: true,
           title: "",
           description: ""
       })
       this.setState({ data })
   }

   handleCancel = async () => {
       await this.getBlogs();
   }

   handleEdit = (postId) => {
       const data = this.state.data.map((item) => {
           if (item.id === postId) {
               item.editMode = true;
           }
           return item;
       });
       this.setState({ data });
   }

   handleDelete = async (blogId) => {
       await fetch(`/blogs/${blogId}`, {
           method: 'DELETE',
           headers: {
               'content-type': 'application/json',
               accept: 'application/json',
           },
       })
       await this.getBlogs();
   }

   handleSubmit = async (event) => {
       event.preventDefault();
       const data = new FormData(event.target);

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
       await this.getBlogs();
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
                        <Card item={item}
                            handleSubmit={this.handleSubmit}
                            handleEdit={this.handleEdit.bind(this, item.id)}
                            handleDelete={this.handleDelete.bind(this, item.id)}
                            handleCancel={this.handleCancel}
                        />)
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

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Admin), domContainer);