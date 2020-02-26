/***** 
 * 
 *  Home.js 
 *  Created by: Aleena Watson
 *  Date: 2.25.2020
 * 
 * 
 *  Think of the Home component as a landing page. This is what is populated
 *  when a user is not logged in, and/or visits '/' or '/home'.
 *  Here, 3 random blogs are populated to the page from the server. 
 *  A user can click on a blog and follow the flow to the Blog 
 *  Space of that blog. There, they will see what is outlined 
 *  in BlogPosts, which is the Blog title and description at  
 *  the top (currently a light blue color), then the 0-many 
 *  posts for that blog.
 * 
 * 
 * ******/


const Blog = ({ item }) => {
    const { id, title, description } = item
 
    return (
        <div className="card mt-4" Style="width: 100%;">
            <div className="card-body">
                <a href={"/b/" + id}><h5 className="card-title">{title || "No Title"}</h5></a>
                <p className="card-text" Style="white-space: pre-line;">{description || "No Description"}</p>
            </div>
        </div>
    )
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            blogs: [] 
        }
    }

    componentDidMount() {
        this.getBlog()
    }

    getBlog = async () => {
        const response = await fetch(`/random-blogs`)
        const data = await response.json()
        this.setState({ blogs: data })
    }

    render() {
        return (
            <div>
                <AppNav />
                { this.state.blogs.map(item => 
                    <Blog item={item} />) 
                }
            </div>
        )
    }
}

const domContainer = document.querySelector('#root')
ReactDOM.render(React.createElement(Home), domContainer)