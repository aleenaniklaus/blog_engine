
const Blog = ({ item }) => {
    const { id, title, description } = item
 
     return (
         <div class="card mt-4" Style="width: 100%;">
             <div class="card-body">
                 <a href={"/b/" + id}><h5 class="card-title">{title || "No Title"}</h5></a>
                 <p class="card-text">{description || "No Description"}</p>
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
                {
                this.state.blogs.map(item =>
                    <Blog item={item} />)
                }
            </div>
        )
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(Home), domContainer);