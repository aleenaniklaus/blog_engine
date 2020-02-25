
class AppNav extends React.Component {
    constructor(props) {
       super(props)
       this.state = { 
            user: { 
                loggedIn: false 
            }
        }
    }
    componentDidMount() {
        this.getUser()
    }

    getUser = async () => {
        const response = await fetch(`/user`)
        const data = await response.json()
        this.setState( {user: data} )
    }

   render() {
       return (
            <nav class="navbar navbar-dark bg-dark">
                <a class="navbar-brand" href="#">My Blog Space</a>
               {
                this.state.user.loggedIn == true ? (
                    <span>
                        <a role="button" class="btn btn-outline-info navbar-btn" href="/admin">Admin</a>
                        <a role="button" class="btn btn-outline-info navbar-btn" href="/logout">Logout</a>
                    </span>
                ) : (
                    <span>
                        <a role="button" class="btn btn-outline-info navbar-btn" href="/register">Register</a>
                        <a role="button" class="btn btn-outline-info navbar-btn" href="/login">Login</a>
                    </span>
                )
               }
            </nav>
       )
   }
}