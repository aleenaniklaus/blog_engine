'use strict'

const AppNav = () => (
    <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">My Blog Space</a>
        <a role="button" class="btn btn-outline-info navbar-btn" href="/login">Login</a>
    </nav>
 ) 

function Register() {
    return (
        <div>
            <AppNav />
            <div className="card mt-4 card-body" Style="width: 100%;">
                <form action="/register" method="post">
                    <div>
                        <label>First Name</label>
                        <input
                            required
                            name="firstName"
                            type="text"
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            required
                            name="lastName"
                            type="text"
                        />
                    </div>
                    <div>
                        <label>email</label>
                        <input
                            required
                            name="email"
                            type="text"
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            required
                            name="password"
                            type="password"
                        />
                    </div>

                    <button type="submit" 
                            class="btn btn-primary">
                                Register
                    </button>
                </form>
            </div>
        </div>
    )   
}

const domContainer = document.querySelector('#root')
ReactDOM.render(React.createElement(Register), domContainer)