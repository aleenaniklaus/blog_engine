// 'use strict';
const e = React.createElement;

const AppNav = () => (
   <nav class="navbar navbar-dark bg-dark">
       <a class="navbar-brand" href="#">My Blog Space</a>
       <a role="button" class="btn btn-outline-info navbar-btn" href="/logout">Logout</a>
   </nav>
)

function Register() {
    return (
        <div>
            <AppNav />
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
    )   
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Register), domContainer);
