/***** 
 * 
 *  AppNav.js 
 *  Created by: Aleena Watson
 *  Date: 2.25.2020
 * 
 * 
 *  React Component to populate the Navbar. State determines if
 *  buttons on the RHS of the screen are 'login/logout'
 *  and either Register or Admin (and navigates appropriately). 
 *  If the user isn't logged in, the 'Register' button appears 
 *  as the left button, and 'login' as the right button. If 
 *  the user is logged in, the left button reads 'Admin', 
 *  and right reads 'Logout'
 * 
 *  Future improvements: 
 *  - Change 'My Blog Space' to read 'Admin' or 'Edit Blogs' 
 *    etc., to tell the user what page they are currently on.
 * 
 * 
 * ******/


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
                <nav className="navbar navbar-dark bg-dark">
                <div className="navbar-brand">Blog Space</div>
                {
                    this.state.user.loggedIn == true ? (
                        <span>
                            <a role="button" className="btn btn-outline-info navbar-btn ml-2" href="/admin">Admin</a>
                            <a role="button" className="btn btn-outline-info navbar-btn ml-2" href="/logout">Logout</a>
                        </span>
                    ) : (
                        <span>
                            <a role="button" className="btn btn-outline-info navbar-btn ml-2" href="/register">Register</a>
                            <a role="button" className="btn btn-outline-info navbar-btn ml-2" href="/login">Login</a>
                        </span>
                    )
                }
            </nav>
        )
    }
}