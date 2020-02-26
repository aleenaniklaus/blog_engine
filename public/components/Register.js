/***** 
 * 
 *  Register.js 
 *  Created by: Aleena Watson
 *  Date: 2.25.2020
 * 
 * 
 *  In order to comment on a post, you must be registered.
 *  This component takes information needed by Okta in order
 *  to register with them.
 * 
 *  Future improvements:
 *  - add name/username into database to be able to display 
 *    when a user makes a comment, or a blogger wants to 
 *    display their information 
 *  - create different registration page for a 'reader' only
 *    who does not care about posting their own blogs.
 * 
 *
 * ******/ 


class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            registration: { 
                message: '' 
            }
        }
    }

    componentDidMount() {
        this.getRegistration()
    }

    getRegistration = async () => {
        const response = await fetch(`/registration`)
        const data = await response.json()
        this.setState( {registration: data} )
    }

    render() {
        return (
            <div>
                <AppNav />
                {
                    this.state.registration.message !== '' ? (
                        <div className="card mt-4 cardbody" Style="width: 100%;">
                            <div className="card-body">
                                {this.state.registration.message}
                            </div>
                        </div>
                    ) : null
                }
                <div className="card mt-4 card-body" Style="width: 100%;">
                    <form action="/register" method="post">
                        <div>
                            <label Style="padding: 10px;">First Name:</label>
                            <input
                                required
                                name="firstName"
                                type="text"
                            />
                        </div>
                        <div>
                            <label Style="padding: 10px;">Last Name:</label>
                            <input
                                required
                                name="lastName"
                                type="text"
                            />
                        </div>
                        <div>
                            <label Style="padding: 10px;">Username/Email:</label>
                            <input
                                required
                                name="email"
                                type="text"
                            />
                        </div>
                        <div>
                            <label Style="padding: 10px;">Password:</label>
                            <input
                                required
                                name="password"
                                type="password"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const domContainer = document.querySelector('#root')
ReactDOM.render(React.createElement(Register), domContainer)